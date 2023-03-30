function authenticateUser(){
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (user =="admin" && password =="admin") {
        openAdminPage()
    }else{
        alert("no funciona")
    }
}
function openAdminPage(){
    window.location.replace("../EDD_1S2023_PY_201902363/html/admin.html")
}