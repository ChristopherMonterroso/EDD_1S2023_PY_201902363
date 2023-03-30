$('ul.tabs li a:first').addClass('active');
$('.section article').hide();
$('.section article:first').show();

$('ul.tabs li a').on('click', function () {
	$('ul.tabs li a').removeClass('active');
	$(this).addClass('active')
	$('.section article').hide()
	var activeTab = $(this).attr('href');

	$(activeTab).show()
	return false;
});

function logOut(){
	window.location.replace("index.html")
}