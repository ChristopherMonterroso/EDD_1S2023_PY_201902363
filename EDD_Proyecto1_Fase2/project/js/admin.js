
//función para activar una pestaña al ser activadas
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

$('.button').on('click',function(){
	$('.button').value="Estudiantes cargados"
});
function logOut() {
	window.location.replace("index.html")
}


let avlTree = new avlTree();



function loadStudentsForm(e) {
    e.preventDefault();
    const inputFile = document.getElementById('inputFile');
	const file = inputFile.files[0]; 
    let studentsArray = [];
    try{        
        let reader = new FileReader();
		
        reader.readAsText(file);
        reader.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
           
            $('#table tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                            <td data-th="Carnet">${item.carnet}</td>
                            <td data-th="Nombre">${item.nombre}</td>
                            <td data-th="Password">${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
		
        console.log(error);
        alert("Error en la inserción");
    }

}
function showLocalStudents(){
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#table tbody').html(
        avlTree.inOrder()
    )
}

$( document ).ready(showLocalStudents);