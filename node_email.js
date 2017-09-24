//npm install nodemailer
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mitfans881@gmail.com',
    pass: 'mit96109dcsz'
  }
});

var mailOptions = {
  from: 'mitfans881@gmail.com',
  to: 'jl12614@ic.ac.uk',
  subject: 'Sending Email using Node.js',
  text: 'Test messaging'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
