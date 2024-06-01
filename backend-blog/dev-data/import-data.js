const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require(`bcrypt`);
const slugify = require('slugify');
// importing models
const Tag = require('../models/tagModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const Message = require('../models/messageModel');

// configuring env variables
dotenv.config({ path: './config.env' });

// connecting to database and runing import method
mongoose
  .connect(process.env.DATABASE)
  .then(async () => {
    console.log('Connted to database');
    await importData();
    process.exit(1);
  })
  .catch((err) => {
    console.log('Failed to insert data to database');
    console.error(err.message);
    process.exit(1);
  });

//reading tags and parsing to array from text file
const tags = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/tags.txt`), 'utf-8')
);

//reading users and parsing to array from text file
const users = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/users.txt`), 'utf-8')
);

//reading categories and parsing to array from text file
const categories = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/categories.txt`), 'utf-8')
);

// reading blogs nad parsing to array from text file
const blogs = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/blogs.txt`), 'utf-8')
);

// reading comments nad parsing to array from text file
const comments = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/comments.txt`), 'utf-8')
);

// reading mesasge and parsing to array from text file
const messages = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/messages.txt`), 'utf-8')
);

// freshind database data so it can be consisted to delete with ease each time we wnat to do it
async function importData() {
  // deleting all tags then hasing password inserting all new users
  await User.deleteMany();
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      return {
        ...user,
        password: hashedPassword,
        passwordConfirm: hashedPassword,
      };
    })
  );
  await User.insertMany(hashedUsers, { validateBeforeSave: false });

  // deleting all tags then inserting new ones
  await Tag.deleteMany();
  await Tag.insertMany(tags);

  // deleting all categories then inserting new ones
  await Category.deleteMany();
  await Category.insertMany(categories);

  // slugifying blog titles
  const SlugifiedBlogs = blogs.map((blog) => ({
    ...blog,
    slug: slugify(blog.title),
  }));
  // deleting all categories then inserting new ones
  await Blog.deleteMany();
  await Blog.insertMany(SlugifiedBlogs);

  // deleting all comments and then inserting new ones
  await Comment.deleteMany();
  await Comment.insertMany(comments);

  await Message.deleteMany();
  const updatedMessages = messages.map((message) => ({
    ...message,
    subject: 'Justing for testing purpose ',
    from: 'borisdimitirjevicit@gmail.com',
  }));
  await Message.insertMany(updatedMessages);

  console.log('Data has been inserted to database');
}
