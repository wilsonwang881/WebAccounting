document.getElementById("title").onclick = function (){
    
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

document.getElementById("add_button").onclick = function () {
    window.location.href = "/usr_main.html";
}


document.getElementById("setting_button").onclick = function () {
    window.location.href = "/settings.html";
}

document.getElementById("view_button").onclick = function () {
    window.location.href = "/main_view.html";
}
