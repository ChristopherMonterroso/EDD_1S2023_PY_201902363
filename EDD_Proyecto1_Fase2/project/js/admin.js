let avlTree = new AvlTree();

function loadStudentsForm(event) {
    event.preventDefault();
    
    const inputFile = document.getElementById('inputFile');
    const file = inputFile.files[0];
    let studentsArray = [];
    
    try {
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = () => {

            studentsArray = JSON.parse(reader.result).alumnos;
            
            $('#table tbody').html(
                studentsArray.map((item, index) => {
                    return (`
                        <tr>
                            <td data-th="Carnet">${item.carnet}</td>
                            <td data-th="Nombre">${item.nombre}</td>
                            <td data-th="Password">${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            
            for (let i = 0; i < studentsArray.length; i++) {
                let item={
                    carnet:studentsArray[i].carnet,
                    nombre:studentsArray[i].nombre,
                    password:studentsArray[i].password,
                    carpeta_raiz:studentsArray[i].carpeta_raiz
                }
                avlTree.insert(item);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert("Estudiantes cargados")
            
        }
    } catch (error) {

        console.log(error);
        alert("Error en la inserción");
    }

}
function showLocalStudents() {
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#table tbody').html(
        avlTree.inOrder()
    )
}
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { node[shape=circle] bgcolor=transparent ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}
function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    
    if(avlTree.root !== null){
        switch(form.opcion){
            case 'inOrder':
                $('#table tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#table tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#table tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#table tbody').html("")
                break;
        }
    }
}

//función para activar una pestaña al ser presionadas
$('ul.tabs li a:first').addClass('active');
$('.section article').hide();
$('.section article:first').show();

$('ul.tabs li a').on('click', function () {
    $('ul.tabs li a').removeClass('active');
    $('.nav-bar').removeClass('active')
    $(this).addClass('active')
    $('.section article').hide()
    var activeTab = $(this).attr('href');

    $(activeTab).show()
    return false;
});

function logOut() {
    window.location.replace("index.html")
}
$(document).ready(showLocalStudents);
