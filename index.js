//login part
document.getElementById("login_button").onclick = function (){
  var usrname = document.getElementById("login_name").value;
  var passwd = document.getElementById("login_password").value;
  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {
    if (xml.readyState==4 && xml.status==200) {
      var display = document.getElementById("receive");
      var server_response = this.responseText;

      if (server_response == "login successful") {
        $("button").remove(".b");
        $("input").remove(".b");
        $("label").remove(".b");
        document.getElementById("title").innerHTML = "Login Successful!";
        window.location.href = "/usr_main.html";
      }
      else {
        display.innerHTML = server_response;
        display.style.color = "red";
      }
    }
  };
    xml.open("POST","/usr_login",true);
    xml.setRequestHeader("user_name", usrname);
    xml.setRequestHeader("password", passwd);
    xml.send();
};

//register part
function verify_all (usrname, passwd, re_passwd, email) {
  var reg_exp = /\S+@\S+\.\S+/;

  if (usrname.length <= 100
     && passwd.length >= 8
     && re_passwd == passwd
     && reg_exp.test(email)) {
    return true;
  }
  else {
    return false;
  }
}

document.getElementById("register_button").onclick = function (){
  var usrname = document.getElementById("register_name").value;
  var passwd = document.getElementById("register_password").value;
  var passwd_re = document.getElementById("register_re_password").value;
  var email = document.getElementById("register_email").value;
  var verification = verify_all(usrname, passwd, passwd_re, email);

  if (verification == true) {
    var xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
      if (xml.readyState==4 && xml.status==200) {
        var display = document.getElementById("title");
        var server_response = this.responseText;
        if (server_response == "register request received") {
          $("button").remove(".b");
          $("input").remove(".b");
          $("label").remove(".b");
          document.getElementById("title").innerHTML = "Request sent!";
        }
        else {
            display.innerHTML = server_response;
            display.style.color = "red";
        }
      }
  };
  xml.open("POST","/usr_register",true);
  xml.setRequestHeader("user_name", usrname);
  xml.setRequestHeader("password", passwd);
  xml.setRequestHeader("email", email);
  xml.send();
  }
  else {
      console.log("not verified");
  }
};

//forget password part
function verify (email) {
  var reg_exp = /\S+@\S+\.\S+/;

  if (reg_exp.test(email)) {
    return true;
  }
  else {
    return false;
  }
}

document.getElementById("re_send_button").onclick = function (){
  var email = document.getElementById("verify_email").value;
  var verification = verify(email);

  if (verification == true) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {

    if (xml.readyState==4 && xml.status==200) {
      var display = document.getElementById("title");
      var server_response = this.responseText;
      if (server_response == "retrieve request received") {
        $("button").remove(".b");
        $("input").remove(".b");
        $("label").remove(".b");
        document.getElementById("title").innerHTML = "Please check your email!";
    }
    else {
      display.innerHTML = server_response;
      display.style.color = "red";
    }
  }
  };
  xml.open("POST","/usr_passwd_retrieve",true);
  xml.setRequestHeader("email", email);
  xml.send();
  }
  else {
    console.log("not verified");
  }
};

//navigation part
document.getElementById("main_button_login").onclick = function() {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).show();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("main_button_register").onclick = function () {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).show();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("main_button_forget").onclick = function () {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).show();
}

document.getElementById("back_login").onclick = function () {
  $(document.getElementById("welcome")).show();
  $(document.getElementById("main")).show();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("back_register").onclick = function () {
  $(document.getElementById("welcome")).show();
  $(document.getElementById("main")).show();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("back_forget").onclick = function () {
  $(document.getElementById("welcome")).show();
  $(document.getElementById("main")).show();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("login_forget_button").onclick = function () {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).show();
}

document.getElementById("login_register_button").onclick = function () {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).hide();
  $(document.getElementById("register_form")).show();
  $(document.getElementById("forget_password_form")).hide();
}

document.getElementById("register_login_button").onclick = function () {
  $(document.getElementById("welcome")).hide();
  $(document.getElementById("main")).hide();
  $(document.getElementById("login_form")).show();
  $(document.getElementById("register_form")).hide();
  $(document.getElementById("forget_password_form")).hide();
}
