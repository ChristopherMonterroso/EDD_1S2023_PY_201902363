package queue

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"time"

	"fase1.com/fase1/structs"
)

type LinkedList struct {
	head *NodeQueue
	Size int
}

// AGREGAR A LA LISTA AL FINAL
func (list *LinkedList) Add(std *structs.Student) {
	//Declarar nuevo nodo
	newNode := &NodeQueue{Student: std, Next: nil}
	if list.head == nil {
		list.head = newNode
	} else {
		tmp := list.head
		for tmp.Next != nil {
			tmp = tmp.Next
		}
		tmp.Next = newNode
		list.Size += 1
	}
}

func (list *LinkedList) Remove() (*structs.Student, int) {
	if list.head == nil {
		return nil, -1
	} else {

		tmp := list.head
		// Eliminar de la cola
		list.head = list.head.Next
		list.Size -= 1
		return tmp.Student, list.Size
	}
}

func (list *LinkedList) Print() {
	temp := list.head
	for temp != nil {
		temp.Student.Print()
		temp = temp.Next
	}
}
func (list *LinkedList) InsertionSort() {
	if list.head == nil || list.head.Next == nil {
		return
	}
	var sortedList *NodeQueue = nil
	current := list.head
	for current != nil {
		next := current.Next
		sortedList = sortedInsert(sortedList, current)
		current = next
	}
	list.head = sortedList
}

// Inserta un nodo en una lista enlazada ordenada y devuelve la cabeza de la lista ordenada
func sortedInsert(head *NodeQueue, newNode *NodeQueue) *NodeQueue {
	if head == nil || newNode.Student.Carnet < head.Student.Carnet {
		newNode.Next = head
		return newNode
	}

	current := head
	for current.Next != nil && current.Next.Student.Carnet <= newNode.Student.Carnet {
		current = current.Next
	}

	newNode.Next = current.Next
	current.Next = newNode
	return head
}

// login y bitacora
func (list *LinkedList) Login(user int, password string) bool {
	tmp := list.head
	for tmp != nil {
		if tmp.Student.Carnet == user && tmp.Student.Password == password {
			now := time.Now()
			fmt.Println("	***Sesión iniciada***")
			fmt.Println("\nHora actual:", now.Format("15:04"))
			fmt.Println("Fecha actual:", now.Format("01-02-2006"))
			fmt.Println("_____________________________________")
			tmp.Student.Print()
			fmt.Print("presione ENTER para continuar...")
			fmt.Scanln()
			return true
		}
		tmp = tmp.Next
	}
	return false
}

func (list *LinkedList) GenerarJson() {
	tmp := list.head
	i := 0
	studentSlice := make([]structs.Student, list.Size)
	for tmp != nil {
		studentSlice[i] = *tmp.Student
		i += 1
		tmp = tmp.Next
	}
	// Codificamos el slice de estudiantes a JSON
	jsonData, err := json.Marshal(studentSlice)
	if err != nil {
		fmt.Println(err)
		return
	}
	err = os.WriteFile("stundents.json", jsonData, 0644)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("\n **Archivos json generado** ")
}

func (list *LinkedList) GenerarGraphviz() string {
	tmp := list.head
	nodes := ""
	dir := ""

	cont := 1
	for {
		nodes += "n" + strconv.Itoa(cont) + "\n[label=\"Carné:" + strconv.Itoa(tmp.Student.Carnet) + "\nNombre: " + tmp.Student.Nombre + "\"];\n"
		if cont < list.Size {
			dir += "\nn" + strconv.Itoa(cont) + "->n" + strconv.Itoa(cont+1) + "[dir=both]"
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
		"<tr><td bgcolor=\"lightgray\">Estudiantes en sistema " + strconv.Itoa(list.Size) + "</td></tr>" +
		"</table> > ];\n" +
		nodes +
		"n0->n1[dir=back]" +
		dir +
		"\n}"
}
