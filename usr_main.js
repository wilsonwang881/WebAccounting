function validation (transaction_date, payment, in_out_value) {
    return (parseInt(transaction_date.slice(0, 4)) > 0 && parseInt(transaction_date.slice(5, 7)) > 0 && parseInt(transaction_date.slice(5, 7)) < 13 && parseInt(transaction_date.slice(8)) > 0 && parseInt(transaction_date.slice(8)) < 32 && Number.isInteger(payment));
}

document.getElementById("save").onclick = function (){
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
//            return;
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

document.getElementById("reset").onclick = function () {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("payment").value = "";
    document.getElementById("bio").value = "";
    
}

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