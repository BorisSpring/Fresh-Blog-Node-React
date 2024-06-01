const fs = require('fs');

exports.deleteUserImage = async function (userImageName) {
  await fs.promises.unlink(
    `${__dirname}/../public/img/users/${userImageName}`,
    function (err) {
      if (err) {
        console.error('There was an error deleting user iamge');
        console.error(err.message);
      }
    }
  );
};

exports.deleteBlogImage = async function (blogImageName) {
  await fs.promises.unlink(
    `${__dirname}/../public/img/blogs/${blogImageName}`,
    function (err) {
      if (err) {
        console.error('There was an error deleting user iamge');
        console.error(err.message);
      }
    }
  );
};
