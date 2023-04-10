let avlTree = new AvlTree();
function authenticateUser() {

    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (user == "admin" && password == "admin") {
        openAdminPage()
    } else if (user == "clear" && password == "clear") {
        localStorage.clear()
    } else {
        
        let Label = document.getElementById("label");
        let tmp = localStorage.getItem("avlTree")
        avlTree.root = JSON.parse(tmp).root;
        console.log(avlTree.authenticateUser(user,password));
        
       /*     Label.textContent = "*Datos correctos*";
        } else {
            Label.textContent = "*Datos incorrectos*";
        }*/
    }

}
function openAdminPage() {

    window.location.replace("admin.html")
}