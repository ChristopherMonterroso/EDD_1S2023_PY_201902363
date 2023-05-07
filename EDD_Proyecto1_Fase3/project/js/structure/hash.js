
class HashNode{
    constructor(carnet, nombre, password){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;

    }
 
}



// CLASE TABLA HASH
class HashTable{
    constructor(){
        // ARRAY QUE ALMACENARÁ LOS VALORES
        this.table = new Array(7);
        // CAPACIDAD DEL ARRAY(IRÁ CAMBIANDO A MEDIDA QUE SE AGREGUEN ELEMENTOS)
        this.capacidad = 7;
        // CANTIDAD DE ELEMENTOS INGRESADOS
        this.espaciosUsados = 0;
    }

    // MÉTODO INSERTAR ELEMENTO
    insert(carnet, nombre, password) {
        let indice = this.calcularIndice(carnet);

        let nodoNuevo = new HashNode(carnet, nombre, sha256(password));

        // En la línea anterior se encripta la contraseña utilizando el modelo sha256
        if (indice < this.capacidad) {
            if (this.table[indice] == null) {
                this.table[indice] = nodoNuevo;
                this.espaciosUsados++;
            } else {
                let contador = 1;
                indice = this.recalcularIndice(carnet, contador);
                while (this.table[indice] != null) {
                    contador++;
                    indice = this.recalcularIndice(carnet, contador);
                }
                this.table[indice] = nodoNuevo;
                this.espaciosUsados++;
            }

            this.table.sort(this.compararPorCarnet)
            this.checkCapacidad();
        }

    
    }
    compararPorCarnet(a, b) {
        if (a.carnet < b.carnet) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        } else {
            return 0;
        }
    }

    // METODO PARA APLICAR LA FÓRMULA Y OBTENER EL ÍNDICE
    calcularIndice(carnet){
        // SUMAR CARACTERES ASCII DEL CARNET
        let strCarnet = carnet.toString();
        let sum = 0;
        for(let i = 0; i< strCarnet.length; i++){
            sum += strCarnet.charCodeAt(i);
        }
        // APLICAR EL MÓDULO CON LA CAPACIDAD ACTUAL
        let posicion = sum % this.capacidad;
        return posicion;
    }

    // MÉTODO PARA OBTENER ÍNDICES CUANDO EXISTE UNA COLISIÓN
    recalcularIndice(carnet, contador){
        // CALCULA EL ÍNDICE CON LA FÓRMULA Y SE LE AGREGA EL CONTADOR ^ 2
        let indice = this.calcularIndice(carnet) + (contador*contador);
        // SE LE RESTA LA CAPACIDAD SI ESTA ES SUPERADA
        let nuevo =  this.nuevoIndice(indice);
        // SE RETORNA EL VALOR DEL INDICE
        return nuevo;
    }

    // FÓRMULA PARA RESTAR LA CAPACIADAD HASTA QUE SEA MENOR
    // A LA CAPACIDAD ACTUAL
    nuevoIndice(indice){
        let pos = 0;
        if(indice < this.capacidad){
            pos = indice;
        }else{
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    // MÉTODO PARA REORGANIZAR LOS ELEMENTOS DEL ARRAY
    checkCapacidad(){
        // SE ESTABLECE EL PORCENTAJE DE UTILIZACIÓN
        const utilizacion = this.capacidad * 0.75;
        // SE VERIFICA CON LOS ESPACIOS UTIIZADOS
        if(this.espaciosUsados > utilizacion){
            // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
            this.capacidad = this.generarNuevaCapacidad();
            // SE REINICIA EL CONTEO DE ESPACIOS
            this.espaciosUsados = 0;
            // ARRAY ANTERIOR
            const temp = this.table;
            // LIMPIAR ARRAY ANTERIOR
            this.table = new Array(this.capacidad);
            // INGRESAR LOS VALORES DEL ARRAY ANTERIOR AL NUEVO ARRAY
            temp.forEach(std => {
                this.insert(std.carnet, std.nombre, std.password);
            });
        }

    }

    // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
    generarNuevaCapacidad(){
        let num = this.capacidad + 1; // SE LE SUMA UNO SÓLO PARA QUE NO DEVUELVA LA MISMA CAPACIDAD
        while(!this.#esPrimo(num)){
            num++;
        }
        return num;
    }

    // SE VERIFICA QUE EL NÚMERO SEA PRIMO
    #esPrimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {return false};
        }
        return true;
    }

    // BUSCAR EN LA TABLA HASH
    search(carnet){
        // OBTENER EL ÍNDICE
        let indice = this.calcularIndice(carnet);
        // VERIFICAR QUE EL ÍNDICE ESTÉ DENTRO DE LA CAPACIDAD
        if(indice < this.capacidad){
            try{ // TRY CATCH POR SI ACASO
                // VERIFICAR SI LA POSICIÓN NO ES NULLA Y QUE SI EL CARNET ES EL MISMO
                if(this.table[indice] != null && this.table[indice].carnet === carnet){
                    return this.table[indice];
                }else{
                    // MISMA ITERACIÓN DE LA INSERCIÓN HASTA LLEGAR AL VALOR
                    let contador = 1;
                    indice = this.recalcularIndice(carent, contador);
                    while(this.table[indice] != null){
                        contador ++;
                        indice = this.recalcularIndice(carent, contador);
                        // SE VERIFICA EL CARNET Y SE RETORNA
                        if(this.table[indice].carnet === carnet){
                            return this.table[indice].carnet;
                        }
                    }
                }
            }catch(err){
                console.log("Error ", err);
            }
        }
        return null;
    }

    
    show(tbl){
        this.table.forEach(value => {
            if(value!=null){
                console.log("aqui")
                let row=tbl.insertRow()
                let cell1=row.insertCell(0)
                let cell2=row.insertCell(1)
                let cell3=row.insertCell(2)
                cell1.innerHTML=value.carnet
                cell2.innerHTML=value.nombre
                cell3.innerHTML=value.password
            }
        })
    }

}