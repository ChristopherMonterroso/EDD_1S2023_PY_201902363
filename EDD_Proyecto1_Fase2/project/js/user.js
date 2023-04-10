document.getElementById("img-button").addEventListener("click", function() {
    document.getElementById("inputFile").click();
  });
  
  document.getElementById("inputFile").addEventListener("change", function() {
    var archivo = this.files[0];
    // Realizar operaciones con el archivo seleccionado, como enviarlo al servidor o procesarlo localmente
  });