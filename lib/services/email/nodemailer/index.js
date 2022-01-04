/**********************************************
  nodemailer email service
***********************************************/

const nodemailer = require("nodemailer");
const { nodemailer: nmr } = require("config").get("nodemailer");
const { winLogger } = require("../../../loggers");

/**********************************************
  uncomment the following lines < transporter >
  to use production credentials and make sure
  the credentials are in their respective
  positions in the config file
***********************************************/

// const transporter = nodemailer.createTransport({
//   host: nmr.host,
//   port: 587,
//   secure: false,
//   auth: {
//     user: nmr.user,
//     pass: nmr.pass
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

const sendEmail = async data => {
  try {
    const {
      from = "",
      to = "",
      subject = "",
      text = undefined,
      html = undefined
    } = data;
    winLogger.info(
      `NODEMAILER:SEND: preparing to send email from "${from}" to "${to}" `
    );

    /**********************************************
      comment the following lines
      < transporter, testAccount >
      when switching to use production credentials
    ***********************************************/

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = { from, to, subject };

    if (html) {
      info.html = html;
    } else {
      if (text) {
        info.text = text;
      } else {
        info.text = "";
      }
    }

    const email = await transporter.sendMail(info);
    if (email.rejected.length == 0 && email.accepted.length > 0) {
      winLogger.info(
        `NODEMAILER:SEND: sent email from "${from}" to "${to}" successfully`
      );
    }
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));

    return email;
  } catch (error) {
    winLogger.error(`NODEMAILER:SEND:ERROR: ${error.message}`);
  }
};

module.exports = { sendEmail };
