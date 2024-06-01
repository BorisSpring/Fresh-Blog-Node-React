const nodemailer = require(`nodemailer`);
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Boris Dimitrijevic <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    var transport;

    // if (process.env.NODE_ENV === 'development') {
    //   transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.HOST_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   });
    // } else {
    transport = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SEND_GRID_USERNAME,
        pass: process.env.SEND_GRID_PASS,
      },
    });
    // }

    return transport;
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      html,
      subject,
      text: convert(html),
    };
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to our blog!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      `Forgot your password ? Please visit this url to reset your password ${this.url}`
    );
  }

  async sendVerify() {
    await this.send(
      'verify',
      `Verify Account (You Must be logged in to verify account)`
    );
  }
};
