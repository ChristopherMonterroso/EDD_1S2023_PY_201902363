class AvlNode {
    constructor(item) {
        
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.circularList=new CircularList();
        this.nAryTree= new nAryTree();
        this.sparseMatrix = new sparseMatrix();
    }
}
let = nodes = "";
let = connections = "";

class AvlTree {
    constructor() {
        this.root = null;
    }

    insert(item){
        this.root = this.#insertRecursive(item, this.root);
        this.getHeight(this.root)
        this.root=this.checkBalance(this.root)
    }
    #insertRecursive(item, node){
        if(node==null){
            node=new AvlNode(item)
        }else if(item.carnet<node.item.carnet){
            //left
            node.left=this.#insertRecursive(item,node.left)

        }else if(item.carnet>node.item.carnet){
            //right
            node.right=this.#insertRecursive(item,node.right)
        }
        return node
    }
    getHeight(node){
        node.height=0
        var heightRight=0
        var heightLeft=0
        if(node.left){
            heightLeft-=this.getHeight(node.left)
        }
        if(node.right){
            heightRight+=this.getHeight(node.right)
        }
        node.height=heightRight+heightLeft

        return Math.max(heightRight, Math.abs(heightLeft))+1
    }
    checkBalance(node){
        if(node.left){
            node.left = this.checkBalance(node.left)
        }
        if(node.right){
            node.right=this.checkBalance(node.right)
        }
        this.getHeight(this.root)
        if(node.height>1 || node.height<-1){
            node = this.balancear(node)
            this.getHeight(this.root)
            node=this.checkBalance(node)
        }
        return node
    }
    balancear(parent){
        if(parent.height>1 && parent.right && (parent.right.height>1||parent.right.height<-1)){
            parent.right = this.balancear(parent.right)
        }else if(parent.height<-1 && parent.left && (parent.left.height<-1||parent.left.height>1)){
            parent.left = this.balancear(parent.left)
        }else if(parent.height<0 &&parent.left.height===-1){
            if(parent.left.right){
                var saveRight = parent.left.right
            }
            if(parent.left.left){
                var saveLeft =parent.left.left
            }
            parent.left.right = new AvlNode(parent.item)
            parent.left.right.right=parent.right
            parent =parent.left
            parent.right.left=saveRight
            parent.left =saveLeft
        }else if(parent.height<0 &&parent.left.height===1){
            if(parent.left.right.left){
                var saveLeft = parent.left.right.left
            }if(parent.left.right.right){
                var saveRight = parent.left.right.right
            }
            parent.left.right.right = new AvlNode(parent.item)
            parent.left.right.right.right = parent.right
            parent.left.right.left = new AvlNode(parent.left.item)
            parent.left.right.left.left=parent.left.left
            parent =parent.left.right
            parent.left.right = saveLeft
            parent.right.left = saveRight
        }else if(parent.height>0 &&parent.right.height===1){
            if(parent.right.left){
                var saveLeft =parent.right.left
            }if(parent.right.right){
                var saveRight = parent.right.right
            }
            parent.right.left = new AvlNode(parent.item)
            parent.right.left.left =parent.left
            parent = parent.right
            parent.left.right = saveLeft
            parent.right=saveRight

        }else if(parent.height>0 &&parent.right.height===-1){
            if(parent.right.left.right){
                var saveRight = parent.right.left.right
            }
            if(parent.right.left.left){
                saveLeft=parent.right.left.left
            }
            parent.right.left.left = new AvlNode(parent.item)
            parent.right.left.right = new AvlNode(parent.right.item)
            parent.right.left.right.right=parent.right.right
            parent.right.left.left.left = parent.left
            parent =parent.right.left
            parent.right.left = saveRight
            parent.left.right =saveLeft
        }

        return parent
    }
  
    authenticate(user,password){
        this.current = this.root
        return this.#authenticateRecursive(user,password)
    }

    #authenticateRecursive(user,password){
        if(this.current && this.current.item.carnet.toString()===user && this.current.item.password===password){
            return this.current
        }else if( this.current && this.current.item.carnet<user){
            this.current = this.current.right
            return this.#authenticateRecursive(user,password)
        }else if(this.current && this.current.item.carnet>user){
            this.current = this.current.left
            return this.#authenticateRecursive(user,password)
        }
        return false
    }
    save(user,password,Binnacle,nAry){
        this.current = this.root
        return this.#saveRecursive(user,password,Binnacle,nAry)
    }
    #saveRecursive(user,password,Binnacle,nAry){
        if(this.current && this.current.item.carnet.toString()===user && this.current.item.password===password){
            this.current.circularList=Binnacle
            this.current.nAryTree=nAry
            return this.current
        }else if( this.current && this.current.item.carnet<user){
            this.current = this.current.right
            return this.#saveRecursive(user,password,Binnacle,nAry)
        }else if(this.current && this.current.item.carnet>user){
            this.current = this.current.left
            return this.#saveRecursive(user,password,Binnacle,nAry)
        }
        return false
    }

    treeGraph(){
        nodes = "";
        connections = "";
        if(this.root!=null){
            this.#treeGraphRecursive(this.root);
        }

        return nodes + connections;
    }
    #treeGraphRecursive(current){
        if(current.left != null){
            this.#treeGraphRecursive(current.left);
            connections += `S_${current.item.carnet} -> S_${current.left.item.carnet} [color="white"];\n`;
        }
        nodes += `S_${current.item.carnet}[label="${current.item.nombre}\\nAltura:${current.height}"  style=filled];`
        if(current.right != null){
            this.#treeGraphRecursive(current.right);
            connections += `S_${current.item.carnet} -> S_${current.right.item.carnet} [color="white"];\n`;
        }
    }
    

    inOrder() {
        let html = this.#inOrderRecursive(this.root);
        return html;
    }
    #inOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#inOrderRecursive(current.left);
        }
        row += `
            <tr>
                <td data-th="Carnet">${current.item.carnet}</td>
                <td data-th="Nombre">${current.item.nombre}</td>
                <td data-th="Password">${current.item.password}</td>
            </tr>
        `;
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    preOrder() {
        let html = this.#preOrderRecursive(this.root);
        return html;
    }
    #preOrderRecursive(current) {
        let row = "";
        row += `
            <tr>
                  <td data-th="Carnet">${current.item.carnet}</td>
                  <td data-th="Nombre">${current.item.nombre}</td>
                <td data-th="Password">${current.item.password}</td>
            </tr>
        `;
        if (current.left != null) {
            row += this.#inOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    postOrder() {
        let html = this.#postOrderRecursive(this.root);
        return html;
    }
    #postOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#inOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        row += `
            <tr>
                  <td data-th="Carnet">${current.item.carnet}</td>
                  <td data-th="Nombre">${current.item.nombre}</td>
                <td data-th="Password">${current.item.password}</td>
            </tr>
        `;
        return row;
    }


}
