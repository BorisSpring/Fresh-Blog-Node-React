const express = require('express');
const dotenv = require('dotenv');
const morgan = require(`morgan`);
const path = require(`path`);

// compression responses
const compression = require('compression');

// security
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const ErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRouter');
const tagRouter = require('./routes/tagRouter');
const categoryRouter = require('./routes/categoryRouter');
const commentRouter = require('./routes/commentRouter');
const blogRouter = require('./routes/blogRouter');
const messageRouter = require('./routes/messageRouter');

const app = express();

// settings cross origin request
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.options('*', cors());

// compresing responses
app.use(compression());

// serving blog images
app.use(
  '/images/blogs',
  express.static(path.join(__dirname, 'public', 'img', 'blogs'))
);

// serving user images
app.use(
  '/images/users',
  express.static(path.join(__dirname, 'public', 'img', 'users'))
);

// securtiy
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(
  hpp({
    whitelist: ['enabled', 'createdAt'],
  })
);
// securtiy end

// limiting request to our app per user
const limiter = rateLimit({
  max: 500,
  windowMs: 10 * 60 * 1000,
  message:
    'Too many request for period of 10 minutes! please try again later! Thanks!',
});

app.use('/api', limiter);

// logging incoming request in development mode
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// configuring enviroment variables
dotenv.config({ path: './config.env' });

// limiting json files
app.use(
  express.json({
    limit: '10kb',
  })
);

// routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/messages', messageRouter);

// hadnling not existing routes
app.all('*', (req, res, next) => {
  return next(new AppError(`There is no path for ${req.originalUrl}`, 404));
});

// managing erroros globaly with error controller
app.use(ErrorController);

module.exports = app;
