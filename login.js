document.getElementById("name").value = null;
document.getElementById("password").value = null;

document.getElementById("login_button").onclick = function (){
    var usrname = document.getElementById("name").value;
    var passwd = document.getElementById("password").value;  
    
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

