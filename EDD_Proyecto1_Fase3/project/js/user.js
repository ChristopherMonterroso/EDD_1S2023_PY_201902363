let avlTree = new AvlTree();
let User;
let Binnacle = new CircularList()
let nAry = new nAryTree()
let Matrix = new sparseMatrix()


if (localStorage.getItem("avlTree") && localStorage.getItem("authenticateData")) {
  avlTree.root = JSON.parse(localStorage.getItem("avlTree")).root
  let data = JSON.parse(localStorage.getItem("authenticateData"))
  User = avlTree.authenticate(data.user.toString(), data.password)
  console.log(User)
  Binnacle.root = User.circularList.root
  Binnacle.last = User.circularList.last
  Binnacle.size = User.circularList.size
  nAry.root = User.nAryTree.root
  nAry.root.id = User.nAryTree.root.id
  nAry.size = User.nAryTree.size
  nAry.repeat = User.nAryTree.repeat
  Matrix.head = User.sparseMatrix.head
  Matrix.xSize = User.sparseMatrix.xSize
  Matrix.ySize = User.sparseMatrix.ySize
  
  document.addEventListener('DOMContentLoaded', function () {
    let user = document.getElementById("user")
    user.innerText = "Bienvenido " + User.item.carnet.toString()
    showDesk()
    avlTree.block_chain(User.item.carnet)
  });
}
function createFolder() {
  var fechaActual = new Date();
  var fechaYHora = fechaActual.toLocaleString();
  let nameFile = document.getElementById("folder-name")
  if (nameFile.value !== "") {
    let item = {
      msg: "Se creo la carpeta: " + nAry.insert(nameFile.value, document.getElementById("input-path").value) + " el " + fechaYHora
    }
    Binnacle.insert(item)
    updateDesk()
    save()
    showCLGraph()
    showNAGraph()
  }

}
function deleteFolder() {
  var fechaActual = new Date();
  var fechaYHora = fechaActual.toLocaleString();
  let nameFile = document.getElementById("folder-name")
  if (nameFile.value !== "") {
    if (nAry.delete(nameFile.value, document.getElementById("input-path").value)) {
      let item = {
        msg: "Se elimino la carpeta: " + nameFile.value + " el " + fechaYHora
      }
      Binnacle.insert(item)
    }
    updateDesk()
    save()
    showCLGraph()
    showNAGraph()
  }
}
function reportBinnacle() {
  showCLGraph()
  showForm("report_binnacle")
}
function reportFiles() {
  showSMGraph()
  showForm("report_files")
}
function reportFolders() {
  showNAGraph()
  showForm("report_folders")
}
function showSMGraph() {
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { ${Matrix.graph()} }`
  const graph = document.getElementById("graph_files")
  graph.src = url + body
}
function showCLGraph() {
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { rankdir = TB bgcolor=transparent ${Binnacle.Graph()} }`
  const graph = document.getElementById("graph_binnacle")
  graph.src = url + body
}
function showNAGraph() {
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { rankdir = TB bgcolor=transparent ${nAry.graph()} }`
  const graph = document.getElementById("graph_folders")
  graph.src = url + body
}

function showForm(id) {
  const report_files = document.getElementById("report_files")
  const report_folders = document.getElementById("report_folders")
  const report_binnacle = document.getElementById("report_binnacle")
  const admin_form_table = document.getElementById("desk-container")
  report_files.style.display = "none";
  report_folders.style.display = "none";
  report_binnacle.style.display = "none";
  admin_form_table.style.display = "none";
  let show = document.getElementById(id)
  show.style.display = "grid";
}
function showDesk() {
  showForm("desk-container")
  $('#input-path').val("/")
  $('#desk').html(nAry.getHTML("/"))
}
function updateDesk() {
  showForm("desk-container")
  let path = $('#input-path').val();
  $('#desk').html(nAry.getHTML(path))
}

function entrarCarpeta(folderName) {
  let path = $('#input-path').val();
  let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
  console.log(curretPath)
  $('#input-path').val(curretPath);
  $('#desk').html(nAry.getHTML(curretPath))
}

function createFile() {
  let nameFile = document.getElementById("file-name")
  let path = $('#input-path').val();
  if (nameFile.value !== "") {
    console.log(nameFile.value)
    nAry.getFolder(path).files.push({
      name: nameFile.value,
      content: "",
      type: "text/plain"
    })
    console.log(nAry.getFolder(path).files)
    $('#desk').html(nAry.getHTML(path))
    save()
    showCLGraph()
    showNAGraph()
  }
}

function parseBase64(content) {
  return btoa(content)
}
let n = 1
document.getElementById("img-button").addEventListener("click", function () {
  document.getElementById("inputFile").click();
});

document.getElementById("inputFile").addEventListener("change", function () {
  const file = this.files[0];
  n = 1

  if (file) {
    let path = $('#input-path').val();
    if (file.type === "text/plain") {
      //console.log("es texto plano")
      let fr = new FileReader();
      fr.readAsText(file)
      //console.log(Nario.getFolder(path).files)
      nAry.getFolder(path).files.push({
        name: nAry.repeatFile(file.name, nAry.getFolder(path).files),
        content: parseBase64(fr.result),
        type: file.type
      })
      //console.log(nAry.getFolder(path).files)
      $('#desk').html(nAry.getHTML(path))
      save()
      showCLGraph()
      showNAGraph()
    } else if (file.type.startsWith('image/') || file.type === "application/pdf") {
      let fr = new FileReader();
      fr.readAsText(file)
      nAry.getFolder(path).files.push({
        name: nAry.repeatFile(file.name, nAry.getFolder(path).files),
        content: parseBase64(fr.result),
        type: file.type
      })
      $('#desk').html(nAry.getHTML(path))
      save()
      showCLGraph()
      showNAGraph()
    }
    n += 1

  }

  return true
})
let blockChain = new BlockChain();

// ACTUALIZAR AMBOS CHATS 
function updateChats(){
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
    $('#receiver-chat').html(blockChain.getMessages(receiver, transmitter));
}


async function sendMessage(whoSend){
    // OBTENER VALORES DEL SELECT 
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(transmitter, receiver, msgt);
                $('#msg-transmitter').val("");
            break;
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(receiver, transmitter, msgr);
                $('#msg-receiver').val("");
            break;
        }
        alert("Mensaje enviado");
        // ACTUALIZAR CHATS
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
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

// Realizar operaciones con el archivo seleccionado, como enviarlo al servidor o procesarlo localmente

function logout() {
  let TokenLogin = JSON.parse(localStorage.getItem("authenticateData"))
  TokenLogin.user = "none"
  TokenLogin.password = "none"
  localStorage.setItem("authenticateData", JSON.stringify(TokenLogin))

  window.location.replace("index.html")
}


function save() {
  let TokenLogin = JSON.parse(localStorage.getItem("authenticateData"))
  avlTree.save(TokenLogin.user.toString(), TokenLogin.password, Binnacle, nAry)
  localStorage.setItem("avlTree", JSON.stringify(avlTree))
}