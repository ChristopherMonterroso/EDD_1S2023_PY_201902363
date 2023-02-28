package structs

import "fmt"

type Student struct {
	Nombre   string
	Carnet   int
	Password string
}

func (n *Student) Print() {
	fmt.Println("_____________________________________")
	fmt.Printf("\n Nombre: %s\n", n.Nombre)
	fmt.Printf(" Carnet: %d\n", n.Carnet)
	fmt.Printf(" Contraseña: %s\n", n.Password)
	fmt.Println("_____________________________________")
}
