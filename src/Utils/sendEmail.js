const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, payload) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'tuanmnguye@gmail.com',
      port: 465,
      auth: {
        user: 'tuanmnguye@gmail.com',
        pass: 'Tuan_1742003', // naturally, replace both with your real credentials or an application-specific password
      },
    });
    const options = () => {
      return {
        from: 'tuanmnguye@gmail.com',
        to: email,
        subject: subject,
        // html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;