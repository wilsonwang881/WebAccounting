//for Google map API
//for displaying the map
var map;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {

    center: {lat: -34.397, lng: 150.644},

    zoom: 8

  });
}

//validate the user input in the adding new entry form
function validation (transaction_date, payment, in_out_value) {

  return (parseInt(transaction_date.slice(0, 4)) > 0
  && parseInt(transaction_date.slice(5, 7)) > 0
  && parseInt(transaction_date.slice(5, 7)) < 13
  && parseInt(transaction_date.slice(8)) > 0
  && parseInt(transaction_date.slice(8)) < 32
  && Number.isInteger(payment));

}

//adding new entry to the database
document.getElementById("add").onclick = function (){

  var transactor_name = document.getElementById("name").value;

  var transaction_date = document.getElementById("mail").value;

  var payment = document.getElementById("payment").value;

  var in_out_value = document.getElementById("inout").value;

  var note = document.getElementById("bio").value;

  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {

    if (xml.readyState==4 && xml.status==200) {

      var display = document.getElementById("receive");

      var server_response = this.responseText;

      if (server_response == "add request received") {

        $("button").remove(".b");

        $("input").remove(".b");

        $("label").remove(".b");

        $("legend").remove(".b");

        $("textarea").remove(".b");

        document.getElementById("title").innerHTML = "New entry added";

        var new_a = document.createElement("a");

        new_a.setAttribute("href", "usr_main.html");

        new_a.setAttribute("id", "new_a");

        document.getElementById("new_button").appendChild(new_a);

        var new_button = document.createElement("button");

        new_button.innerHTML = "Add new";

        new_button.setAttribute("type","button");

        document.getElementById("new_a").appendChild(new_button);

      }

      else {

        display.innerHTML = server_response;

        display.style.color = "red";

      }
    }
  };

  xml.open("POST","/usr_add",true);

  xml.setRequestHeader("transactor_name", transactor_name);

  xml.setRequestHeader("transaction_date", transaction_date);

  xml.setRequestHeader("payment", parseInt(payment));

  xml.setRequestHeader("inout", in_out_value);

  xml.setRequestHeader("note", note);

  xml.send();
};

//clear entries in the form
document.getElementById("reset").onclick = function () {

  document.getElementById("name").value = "";

  document.getElementById("mail").value = "";

  document.getElementById("payment").value = "";

  document.getElementById("bio").value = "";
}

//get the date
document.getElementById("get_date").onclick = function () {

  var date = new Date();

  var year = date.getFullYear();

  function get_month (date) {

    var month_raw = (date.getMonth() + 1).toString();

    if (month_raw.length < 2) {

      return "0"+month_raw;

    }

    else {

      return month_raw;

    }
  }

  var month = get_month(date);

  function get_day (date) {

    var date_raw = (date.getDate()).toString();

    if (date_raw.length < 2) {

      return "0" + date_raw;

    }
    else {

      return date_raw;

    }
  }

  var day = get_day(date);

  var date_total = year.toString() + "-" + month + "-" + day;

  document.getElementById("mail").value = date_total;

}

document.getElementById("transaction_view").onclick = function (){

  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {

    if (xml.readyState==4 && xml.status==200) {

      var server_response = this.responseText;

      document.getElementById("info").innerHTML = server_response;

    }
  };

  xml.open("POST","/usr_view",true);

  xml.send();

};

document.getElementById("logout_button").onclick = function () {

  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {

    if (xml.readyState==4 && xml.status==200) {

      var server_response = this.responseText;

      if (server_response == "logout request received") {

        window.location.href = "/index.html";

      }
    }
  };

  xml.open("POST","/usr_logout",true);

  xml.send();

}

//validate the user inputs for changing settings
function settings_validate (email, new_email, new_password, re_new_password) {

  var reg_exp = /\S+@\S+\.\S+/;

  var flag_email = 0;

  var flag_password = 0;

  if (email == new_email) {

    if (reg_exp.test(email)) {

      flag_email = 1;
    }

    else {

      flag_email = 0;

    }
  }

  else {

    flag_email = 0;

  }

  if (new_password == re_new_password) {

    flag_password = 2;

  }

  else {

    flag_password = 0;

  }

  return flag_password + flag_email;

}
//change user settings
document.getElementById("save").onclick = function () {

  var old_password = document.getElementById("old_password").value;

  var new_password = document.getElementById("new_password").value;

  var re_new_password = document.getElementById("re_new_password").value;

  var new_email = document.getElementById("new_email").value;

  var re_new_email = document.getElementById("re_new_email").value;

  var validation = settings_validate (new_email, re_new_email, new_password, re_new_password);

  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {

    if (xml.readyState==4 && xml.status==200) {

      var server_response = this.responseText;
    }
  };

  if (validation == 1) {

    xml.open("POST","/usr_update_email",true);

    xml.setRequestHeader("new_email", new_email);

    xml.send();

  }

  else if (validation == 2) {

    xml.open("POST","/usr_update_password",true);

    xml.setRequestHeader("old_password", old_password);

    xml.setRequestHeader("new_password", new_password);

    xml.send();

  }

  else if (validation == 3) {

    xml.open("POST", "/user_update_all", true);

    xml.setRequestHeader("new_email", new_email);

    xml.setRequestHeader("old_password", old_password);

    xml.setRequestHeader("new_password", new_password);

    xml.send();

  }

  else {

    console.log("error");

  }
}

//cancel button in the settings form
//clear all the entries
document.getElementById("cancel").onclick = function () {

  document.getElementById("old_password").value = "";

  document.getElementById("new_password").value = "";

  document.getElementById("re_new_password").value = "";

  document.getElementById("new_email").value = "";

  document.getElementById("re_new_email").value = "";

}

//logout
document.getElementById("logout_button").onclick = function () {

  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {

  if (xml.readyState==4 && xml.status==200) {

    var server_response = this.responseText;

    if (server_response == "logout request received") {

        window.location.href = "/index.html";

    }
  }
  };

  xml.open("POST","/usr_logout",true);

  xml.send();

}

document.getElementById("add_button").onclick = function () {

  $(document.getElementById("user_add_form")).show();
  $(document.getElementById("map")).show();
  $(document.getElementById("user_view_form")).hide();
  $(document.getElementById("user_settings_form")).hide();

}

document.getElementById("view_button").onclick = function () {

  $(document.getElementById("user_add_form")).hide();
  $(document.getElementById("map")).hide();
  $(document.getElementById("user_view_form")).show();
  $(document.getElementById("user_settings_form")).hide();

}

document.getElementById("setting_button").onclick = function () {

  $(document.getElementById("user_add_form")).hide();
  $(document.getElementById("map")).hide();
  $(document.getElementById("user_view_form")).hide();
  $(document.getElementById("user_settings_form")).show();

}
