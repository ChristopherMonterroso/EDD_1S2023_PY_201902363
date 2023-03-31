
function logOut() {
	window.location.replace("index.html")
}
//Código para desplegar el botón cuando la pantalla sea pequeña

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
