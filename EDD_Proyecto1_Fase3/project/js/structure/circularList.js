class Node {
    constructor(item,user){
        this.item = item;
        this.nextNode = null;
        this.user=user;
        
    }
}
let  nodes = "";
let  connections = "";

class CircularList {
    constructor() {
        this.root = null;
        this.last = null;
        this.size=0;
    }

    insert(item){
        this.root=this.#insertRecursive(item,this.root)
    }
    #insertRecursive(item, node){
        if(node==null){
            node=new Node(item,this.size)
            this.last=node
        }else {
            let current=node
            while (current.nextNode!=null){
                current=current.nextNode
            }
            current.nextNode=new Node(item,this.size)
            this.last=current.nextNode
        }
        this.size=this.size+1
        return node
    }
    Graph(){
        nodes = "";
        connections = "";
        if(this.root!=null){
            this.#GraphRecursive(this.root);
            try {
                if(this.last.user!==this.root.user){
                    connections += `S_${this.last.user} -> S_${this.root.user} ;\n`;
                }
            }catch (e){

            }

        }
        // console.log(nodes,connections);
        return nodes + connections;
    }

    #GraphRecursive(current) {
        nodes += `S_${current.user}[label="${current.item.msg}\\n " ];\n`
        if(current.nextNode!= null){
            this.#GraphRecursive(current.nextNode);
            connections += `S_${current.user} -> S_${current.nextNode.user} ;\n`;
        }

    }
}