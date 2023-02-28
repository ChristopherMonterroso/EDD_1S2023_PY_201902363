package queue

import "fase1.com/fase1/structs"

type NodeQueue struct {
	Student *structs.Student
	Next    *NodeQueue
}

func (n *NodeQueue) PrintNode() {
	n.Student.Print()
}
