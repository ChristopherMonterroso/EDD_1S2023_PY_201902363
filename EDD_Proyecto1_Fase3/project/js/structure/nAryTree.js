class node {

    constructor(folderName) {
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
    }
}
class nAryTree {
    constructor() {
        this.root = new node('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
        this.repeat = 0;
    }

    insert(folderName, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
        if (fatherNode) {
            folderName = this.repeatFolder(folderName, fatherNode)
            let newNode = new node(folderName);
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            console.log("Ruta no existe");
        }
        return folderName
    }
    delete(folderName, fatherPath) {
        let key = false
        let fatherNode = this.getFolder(fatherPath);
        if (fatherNode) {
            fatherNode.children.forEach(child => {
                if (folderName.toString() === child.folderName) {
                    const id = fatherNode.children.findIndex(node => node.folderName === folderName)
                    fatherNode.children.splice(id, 1)
                    key = true
                }
            })
        } else {
            console.log("Ruta no existe");
        }
        return key
    }

    getFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    repeatFolder(folderName,fatherNode){
        this.repeat=0;
        if(fatherNode.children.length>0){
            return this.repeatFolderRecursive(folderName,fatherNode)
        }
        return folderName
    }
    repeatFolderRecursive(folderName,fatherNode){
        if(fatherNode.children.length>0) {
            fatherNode.children.forEach(child => {
                if(folderName.toString()===child.folderName){
                    const regex = /\(\d+\).*/;
                    const indice = folderName.search(regex);
                    if (indice >= 0) {
                        folderName = folderName.replace(regex, "")
                    }
                    this.repeat+=1
                    folderName=folderName+"("+this.repeat+")"
                    folderName= this.repeatFolderRecursive(folderName,fatherNode)
                }
            })
        }
        return folderName
    }
    repeatFile(fileName,List){
        this.repeat=0;
        if(List.length>0){
            return this.repeatFileRecursive(fileName,List)
        }
        return fileName
    }
    repeatFileRecursive(folderName,List){
        if(List.length>0) {
            List.forEach(child => {
                if(folderName.toString()===child.name){
                    const regex = /\(\d+\).*/;
                    const indice = folderName.search(regex);
                    if (indice >= 0) {
                        folderName = folderName.replace(regex, "")
                    }
                    this.repeat+=1
                    folderName=folderName+"("+this.repeat+")"
                    folderName= this.repeatFileRecursive(folderName,List)
                }
            })
        }
        return folderName
    }

    graph() {
        let nodes = "";
        let connections = "";
        let weight = 1;
        let node = this.root;
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}" style=filled,fillcolor="yellow", shape=folder];\n`;
                node.children.forEach(item => {
                    connections += `S_${node.id} -> S_${item.id} [ label="${weight} "color="black"];\n`
                    queue.push(item);
                });

            }
            weight++;
        }
        return 'node[shape="record"];\n' + nodes + '\n' + connections;
    }

    searchFile(name) {
        let node = this.root
        return this.searchFileRecursive(name, node)
    }
    searchFileRecursive(name, node) {
        let key = false
        if (node.files.map(file => {
            if (file.name === name) {
                key = true
            }
        })
        ) {
            if (key) {
                return true
            }
        } else {
            node.children.map(child => {
                this.searchFileRecursive(name, child)
            })
        }

        return false
    }


    getHTML(path) {
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="./imgs/folder.png" />
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], {type:file.type});
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="folder">
                        <img src="./imgs/file.png" />
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            } else {
                code += ` <div class="folder">
                        <img src="./imgs/file.png" />
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }
}