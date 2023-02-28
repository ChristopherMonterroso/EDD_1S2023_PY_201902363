package queue

import (
	"strconv"

	"fase1.com/fase1/structs"
)

type Queue struct {
	head *NodeQueue
	Size int
}

func (queue *Queue) Enqueue(nombre string, carnet int, password string) {
	//Declarar nuevo nodo
	newStd := &structs.Student{Carnet: carnet, Nombre: nombre, Password: password}
	newNode := &NodeQueue{Student: newStd, Next: nil}
	//Verificar si la lista está vacía
	if queue.head == nil {
		queue.head = newNode
	} else {
		//Recorrer hasta encontrar el último nodo
		tmp := queue.head
		for tmp.Next != nil {
			tmp = tmp.Next
		}
		//Agregar el nuevo nodo hasta el final
		tmp.Next = newNode
		queue.Size += 1

	}
}

func (queue *Queue) Dequeue() (*structs.Student, int) {
	if queue.head == nil {
		return nil, -1
	} else {
		// Tomar valor de la
		tmp := queue.head
		// Eliminar de la cola
		queue.head = queue.head.Next
		queue.Size -= 1
		// Retornar Estudiante
		return tmp.Student, queue.Size
	}
}

// mostrar primero en la cola
func (queue *Queue) PrintPrimeroEnCola() {
	tmp := queue.head
	tmp.Student.Print()
}
func (queue *Queue) PrimeroEnCola() *structs.Student {
	tmp := queue.head
	return tmp.Student
}

// METODO PARA IMPRIMIR LA COLA
func (queue *Queue) Print() {
	tmp := queue.head
	for tmp != nil {
		tmp.Student.Print()
		tmp = tmp.Next
	}
}
func (queue *Queue) GenerarGraphviz() string {
	tmp := queue.head
	nodes := ""
	dir := ""

	cont := 1
	for {
		nodes += "n" + strconv.Itoa(cont) + "\n[label=\"Carné:" + strconv.Itoa(tmp.Student.Carnet) + "\nNombre: " + tmp.Student.Nombre + "\"];\n"
		if cont < queue.Size {
			dir += "\nn" + strconv.Itoa(cont) + "->n" + strconv.Itoa(cont+1) + "[dir=back]"
		}

		tmp = tmp.Next
		cont++
		if tmp == nil {
			break
		}
	}
	return "digraph G {\n" +
		" node[shape=none fontname=Helvetica]\n" +

		" n0[ label = <\n" +
		"<table>\n" +
		"<tr><td bgcolor=\"lightgray\">Cola en espera: " + strconv.Itoa(queue.Size) + "</td></tr>" +
		"</table> > ];\n" +
		nodes +
		"n0->n1[dir=back]" +
		dir +
		"\n}"
}
