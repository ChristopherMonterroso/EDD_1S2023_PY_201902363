package queue

import (
	"fase1.com/fase1/structs"
)

type LinkedListBit struct {
	head *BitNode
	Size int
}

// Tipo stack
func (list *LinkedListBit) Add(info string, date string) {
	//Declarar nuevo nodo
	newBit := &structs.Bitacora{Info: info, Date: date}
	newNode := &BitNode{Bit: newBit, Next: nil}
	//Verificar si la lista está vacía
	if list.head == nil {
		list.head = newNode
	} else {
		// Apuntador del nodo nuevo a la cabeza
		newNode.Next = list.head
		// Cambiar la cabeza al nodo nuevo
		list.head = newNode
		list.Size += 1
	}
}

func (list *LinkedListBit) GraphCode() string {
	tmp := list.head
	filas := ""

	for tmp != nil {
		filas += "<tr><td bgcolor=\"white\">" + tmp.Bit.Info + ", el " + tmp.Bit.Date + "</td></tr>\n"
		tmp = tmp.Next
	}

	return "digraph G {\n" +
		" node[shape=none fontname=Helvetica]\n" +
		" rankdir=TB;\n" +
		" n0[ label = <\n" +
		"<table>\n" +
		"<tr><td bgcolor=\"lightgray\">Bitácora del administrador </td></tr>" +

		"</table> > ];\n" +
		"n1[ label = <\n<table>\n" +
		filas +
		"</table> > ];\n" +
		"n0->n1[dir=none]" +
		"\n}"
}
