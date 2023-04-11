let Label = document.getElementById("label");
let avlTree = new AvlTree();

if(localStorage.getItem("avlTree")){
    avlTree.root=JSON.parse(localStorage.getItem("avlTree")).root
}

function authenticateUser() {

    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let authenticateData={
        "user":user,
        "password":password
    }
    if (user == "admin" && password == "admin") {
       
        localStorage.setItem("authenticateData",JSON.stringify( authenticateData));
        localStorage.setItem("authenticateToken",true)

        Label.textContent = "";
        openAdminPage()
        
    } else if (user == "clear" && password == "clear") {
        localStorage.clear()
        Label.textContent = "";
    } else if (avlTree.authenticate(user,password)) {
        localStorage.setItem("authenticateData",JSON.stringify( authenticateData));
        Label.textContent = "";
        window.location.replace("user.html")
        
    } else {
        Label.textContent = "*Datos incorrectos*";
    } 
        

}
function openAdminPage() {

    window.location.replace("admin.html")
}