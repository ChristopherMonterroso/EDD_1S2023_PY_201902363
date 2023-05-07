if(localStorage.getItem("authenticateToken")){
    let data=JSON.parse(localStorage.getItem("authenticateData"))
    if(data.user!=="admin"&&data.password!=="admin"){
        
        window.location.replace("index.html")

    }
}else {
    window.location.replace("index.html") 
}

let avlTree = new AvlTree();

let Hash= new HashTable();
if(localStorage.getItem("TokenHash")){
    Hash.table=JSON.parse(localStorage.getItem("TokenHash")).table
    Hash.capacidad=JSON.parse(localStorage.getItem("TokenHash")).capacidad
    Hash.espaciosUsados=JSON.parse(localStorage.getItem("TokenHash")).espaciosUsados
    document.addEventListener('DOMContentLoaded', function() {
        const tbl=document.getElementById("table")
        Hash.show(tbl)
    });

}

let blockChain = new BlockChain();
if(localStorage.getItem("BlockChain")){
    console.log("here")
    blockChain.head= JSON.parse(localStorage.getItem("BlockChain")).head
    blockChain.end= JSON.parse(localStorage.getItem("BlockChain")).end
    blockChain.size=JSON.parse(localStorage.getItem("BlockChain")).size
    console.log(blockChain)
    
}

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
            console.log("Loading students)")

            for (let i = 0; i < studentsArray.length; i++) {
                let item={
                    carnet:studentsArray[i].carnet,
                    nombre:studentsArray[i].nombre,
                    password:studentsArray[i].password,
                    carpeta_raiz:studentsArray[i].carpeta_raiz
                }
                Hash.insert(studentsArray[i].carnet,studentsArray[i].nombre,studentsArray[i].password);
                avlTree.insert(item);
            }
            
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            localStorage.setItem("TokenHash", JSON.stringify(Hash))
            alert("Estudiantes cargados")
            Hash.show("table");
            
        }
    } catch (error) {

        console.log(error);
        alert("Error en la inserción");
    }

}
function updateTable(){
    const tbl=document.getElementById("table")
    let rows=tbl.rows.length
    for (let i = rows-1; i >= 0; i--) {
        tbl.deleteRow(i)
    }
    Hash.show(tbl)

}
function getBlock(index){
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));

        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
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
    let authenticateData=JSON.parse(localStorage.getItem("authenticateData"))
    authenticateData.user="none"
    authenticateData.password="none"
    localStorage.setItem("authenticateData",JSON.stringify(authenticateData))
    localStorage.setItem("authenticateToken",false)
    localStorage.setItem("firstLogIn",false)
    window.location.replace("index.html")

    
}

