var express = require("express");
var app = express();
var fs = require('fs');
var array = fs.readFileSync('login_info.txt').toString().split("\n");
//npm install nodemailer
var nodemailer = require('nodemailer');
array.pop();

var current_user;

//log the elements in the txt file
for(var i in array) {
    console.log(array[i]);
}

/*** Write functions here, to be used as Express middleware ***/
function logreq (req, res, next) {
  console.log("New request: " + req.method + req.url);
  next();
}

function sendData (req, res, next) {
  if (req.url == "/usr_login") {
    var verify = false;

    for (var i = 0; i < array.length; i = i + 3) {
      if (array[i].slice(8) == req.get("user_name")) {
        if (array[i + 1].slice(8) == req.get("password")) {
          res.send("login successful");
          console.log("User name = " + array[i].slice(8));
          console.log("Password = " + array[i + 1].slice(8));
          verify = true;
          current_user = array[i].slice(8);
        }
      }
    }

    if (verify == false) {
      console.log("User " + req.get("user_name") + " login not successful");
      res.send("login not successful");
    }
    else {
      console.log("User " + req.get("user_name") + " login successful");
    }

    return;
  }
  else if (req.url == "/usr_register") {

    var user_name = req.get("user_name");
    var password = req.get("password");
    var email = req.get("email")
    var non_repeat = true;

    for (var i = 0; i < array.length; i++) {
      if (array[i].slice(8) == user_name) {
        non_repeat = false;
        break;
      }
    }

    if (non_repeat == true) {
      array.push("username" + user_name);
      array.push("password" + password);
      array.push("email" + email);

      var stream = fs.createWriteStream("login_info.txt");
      stream.once('open', function(fd) {
        for (var elements in array) {
          stream.write(array[elements] + "\n");
        }
        stream.end();
      });

      var stream_new_user = fs.createWriteStream(user_name + ".txt");
      stream_new_user.once('open', function(fd) {
        stream_new_user.write("\n");
        stream_new_user.end();
      });
      res.send("register request received");
    }
    else {
      res.send("registration failed");
    }
    return;
  }
  else if (req.url == "/usr_passwd_retrieve") {
    var verify = false;
    var password;

    for (var i = 2; i < array.length; i = i + 3) {
      if (array[i].slice(5) == req.get("email")) {
          res.send("retrieve request received");
          console.log("Retrieving password: " + array[i].slice(5));
          password = array[i - 1].slice(8);
          verify = true;
      }
    }

    if (verify == false) {
      console.log("User retrieving password not successful");
      res.send("retrieving password not successful");
    }
    else {
      console.log("User " + req.get("user_name") + " retrieving password successful");
      send_email(req.get("email"), password);
    }

    return;
  }
  else if (req.url == "/usr_add") {
    res.send("add request received");

    var array_add = fs.readFileSync(current_user + ".txt").toString().split("\n");
    array_add.pop();

    var transactor_name = req.get("transactor_name");
    var transaction_date = req.get("transaction_date");
    var payment = req.get("payment");
    var inout = req.get("inout");
    var note = req.get("note");

    array_add.push("transactor_name" + transactor_name);
    array_add.push("transaction_date" + transaction_date);
    array_add.push("payment" + payment);
    array_add.push("inout" + inout);
    array_add.push("note" + note);

    var stream = fs.createWriteStream(current_user + ".txt");
    stream.once('open', function(fd) {
      for (var elements in array_add) {
        stream.write(array_add[elements] + "\n");
      }
      stream.end();
    });

    return;
  }
  else if (req.url == "/usr_logout") {
    res.send("logout request received");
    current_user = null;
  }
  else if (req.url == "/usr_view") {
    var array_add = fs.readFileSync(current_user + ".txt").toString().split("\n");
    array_add.pop();
    console.log(array_add.toString());

    res.send(array_add.toString());
    var stream = fs.createWriteStream(current_user + ".txt");
    stream.once('open', function(fd) {
      for (var elements in array_add) {
        stream.write(array_add[elements] + "\n");
      }
      stream.end();
    });

    return;
  }
}

/*** Define routes here ***/
app.use(express.static(__dirname));
app.post("/usr_login", logreq, sendData);
app.post("/usr_register", logreq, sendData);
app.post("/usr_passwd_retrieve", logreq, sendData);
app.post("/usr_update", logreq, sendData);
app.post("/usr_add", logreq, sendData);
app.post("/usr_logout", logreq, sendData);
app.post("/usr_view", logreq, sendData);

/*** Listen on a port here ***/
app.listen(3000, callfunc());

function callfunc() {
  console.log("Server is up");
  console.log("Listening on port 3000...");
}

function send_email (to_whom, password) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email_address',
      pass: 'your_password'
    }
  });

  var email_content = "Your password is: " + password;
  var mailOptions = {
    from: 'mitfans881@gmail.com',
    to: to_whom,
    subject: "Here is your password!",
    text: email_content
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
