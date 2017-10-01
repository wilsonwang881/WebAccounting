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
