const nodemailer = require("nodemailer");

const userEmail = process.env.EMAIL;
const password = process.env.PASSWORD_EMAIL;
var autoEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marsdaycare3@gmail.com",
    pass: "zruofombvdlvjvpt",
  },
});

const sendEmail = async (to, subject, text) => {
  console.log(userEmail + " user Emaill");
  console.log(password + " password");
  let body = {
    from: userEmail,
    to,
    subject,
    text,
  };

  await autoEmail.sendMail(body, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("email sent successfully" + info.response);
    }
  });
};
const sendForgotPasswordMail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    console.log("Sending email forgot password");
    console.log(email,subject,payload,template)
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    console.log(source)
    const options = () => {
      return {
        from: userEmail,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    await autoEmail.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = { sendEmail, sendForgotPasswordMail };
