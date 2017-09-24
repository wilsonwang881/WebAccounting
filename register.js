document.getElementById("name").value = null;
document.getElementById("password").value = null;

function verify (usrname, passwd, re_passwd, email) {
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
    var usrname = document.getElementById("name").value;
    var passwd = document.getElementById("password").value; 
    var passwd_re = document.getElementById("re_password").value;
    var email = document.getElementById("email").value;
    var verification = verify(usrname, passwd, passwd_re, email);
    
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
