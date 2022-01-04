/*****************************************************
  utils
  utcar -> Upgrade To Commercial Account Request
******************************************************/

const {
  errorHandler,
  nodemailer: { sendEmail },
  html: {
    email: {
      utcar: { request, notification }
    }
  }
} = require("../../lib");

const sendEmails = async data => {
  try {
    const { name, phone, license } = data;
    // send email to admin e-mail
    const emailToAdmin = await sendEmail({
      from: "admin@gmail.com",
      to: "management@gmail.com",
      cc: "utcar recieved",
      subject: "",
      html: request({ name, phone, license: license.filename })
    });

    // // send notification to user e-mail
    // const emailToUser = await sendEmail({
    //   from: "admin@gmail.com",
    //   to: `${name}@gmail.com`,
    //   cc: "",
    //   subject: "utcar sent",
    //   html: notification()
    // });

    return;
  } catch (error) {
    throw new errorHandler(error.statusCode, error.message);
  }
};

module.exports = { sendEmails };
