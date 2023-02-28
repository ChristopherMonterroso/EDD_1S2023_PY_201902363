package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"fase1.com/fase1/graphviz"
	"fase1.com/fase1/queue"
	"github.com/sqweek/dialog"
)

var espera = &queue.Queue{Size: 1}
var listaSistema = &queue.LinkedList{Size: 1}
var bitacora = &queue.LinkedListBit{Size: 1}

func main() {
	menu_home()
}

func agregarEstudiante() {
	var (
		nombre   string
		apellido string
		carnet   int
		password string
	)
	fmt.Println("\n╔══════════════════════╗")
	fmt.Println("║       Registro       ║")
	fmt.Println("╚══════════════════════╝")
	fmt.Print("Ingrese el nombre: ")
	fmt.Scanln(&nombre)
	fmt.Print("Ingrese el apellido: ")
	fmt.Scanln(&apellido)
	fmt.Print("Ingrese el carné: ")
	fmt.Scanln(&carnet)
	fmt.Print("Ingrese la contraseña: ")
	fmt.Scanln(&password)
	nombre = nombre + " " + apellido
	espera.Enqueue(nombre, carnet, password)
	fmt.Print("\n**Agregado a la lista de espera**")
	fmt.Println("")
}

func readCsvFile(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Archivo no existe "+filePath, err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Error en la lectura del archivo"+filePath, err)
	}
	return records
}

func verEstudiantesEnSistema() {
	fmt.Println("\n╔══════════════════════════════╗")
	fmt.Println("║      Estudiantes activos     ║")
	fmt.Println("╚══════════════════════════════╝")

	listaSistema.Print()
}

func verEstudiantesPendientes() {
	validar := 0
	fmt.Println("\n╔══════════════════════════════╗")
	fmt.Println("║     Estudiantes pendientes   ║")
	fmt.Println("╚══════════════════════════════╝")
	if espera.Size > 0 {
		for {
			fmt.Printf("       Pendientes : %d\n", espera.Size)
			espera.PrintPrimeroEnCola()
			fmt.Println("\n1. Aceptar")
			fmt.Println("2. Rechazar")
			fmt.Println("3. Regresar")
			fmt.Print("\nElige una opcion: ")
			fmt.Scanln(&validar)

			switch validar {
			case 1:
				now := time.Now()
				date := now.Format("01-02-2006") + " " + now.Format("15:04")
				listaSistema.Add(espera.PrimeroEnCola())
				fmt.Println("Estudiante añadido al sistema.")
				bitacora.Add("Se aceptó a "+espera.PrimeroEnCola().Nombre, date)
				fmt.Printf("Se aceptó a %s, %s\n", espera.PrimeroEnCola().Nombre, date)
				espera.Dequeue()
				fmt.Print("presione ENTER para continuar...")
				fmt.Scanln()
				listaSistema.InsertionSort()
				return
			case 2:
				now := time.Now()
				date := now.Format("01-02-2006") + " " + now.Format("15:04")
				fmt.Println("Estudiante rechazado")
				bitacora.Add("Se rechazó a "+espera.PrimeroEnCola().Nombre, date)
				fmt.Printf("Se rechazó a %s, %s\n", espera.PrimeroEnCola().Nombre, date)
				espera.Dequeue()
				fmt.Print("presione ENTER para continuar...")
				fmt.Scanln()
				return
			case 3:
				return
			default:
				fmt.Println("opción incorrecta")

			}
		}

	} else {
		println("No hay estudiantes")
	}
}

func menuAdmin() {
	var opcion int
	for {
		fmt.Println("\n╔═══════════════════════════╗")
		fmt.Println("║         EDD GoDrive       ║")
		fmt.Println("║       -Administrador-     ║")
		fmt.Println("╚═══════════════════════════╝")
		fmt.Println(" 1.Ver estudiantes pendientes ")
		fmt.Println(" 2.Ver estudiantes del sistema")
		fmt.Println(" 3.Registrar nuevo estudiante")
		fmt.Println(" 4.Carga masiva de estudiantes")
		fmt.Println(" 5.Generar reportes")
		fmt.Println(" 6.Cerrar sesión")
		fmt.Print("\nSeleccione una opción: ")
		fmt.Scanln(&opcion)
		switch opcion {
		case 1:
			verEstudiantesPendientes()
		case 2:
			listaSistema.InsertionSort()
			verEstudiantesEnSistema()
			fmt.Print("presione ENTER para continuar...")
			fmt.Scanln()
		case 3:
			agregarEstudiante()

		case 4:
			filePath, err := dialog.File().Title("Abrir archivo").Filter("Archivos csv", "csv").Load()
			if err != nil {
				fmt.Println("Error al abrir ventana emergente:", err)

			}
			fmt.Println("Archivo seleccionado:", filePath)
			records := readCsvFile(filePath)
			for index, row := range records {
				if index > 0 {
					fmt.Printf("%d: %s\t%s\t%s\n", index, row[0], row[1], row[2])
					num, err := strconv.Atoi(row[0])
					if err != nil {
						fmt.Println("Error:", err)
					} else {
						espera.Enqueue(row[1], num, row[2])
					}

				}
			}
			fmt.Print("\nPresione ENTER para continuar...")

			fmt.Scanln()
		case 5:
			listaSistema.InsertionSort()
			listaSistema.GenerarJson()
			path, err := os.Getwd()
			if err != nil {
				log.Println(err)
			}

			// Escribir el archivo .dot
			graphviz.WriteDotFile(bitacora.GraphCode(), "Admin_bitacora.dot", path)
			// Ejecutar COmando en consola
			graphviz.GeneratePNG("Admin_bitacora.dot", path)

			// Escribir el archivo .dot
			graphviz.WriteDotFile(espera.GenerarGraphviz(), "Cola_espera.dot", path)
			// Ejecutar COmando en consola
			graphviz.GeneratePNG("Cola_espera.dot", path)

			// Escribir el archivo .dot
			graphviz.WriteDotFile(listaSistema.GenerarGraphviz(), "Lista_sistema.dot", path)
			// Ejecutar COmando en consola
			graphviz.GeneratePNG("Lista_sistema.dot", path)

			fmt.Print("\npresione ENTER para continuar...")
			fmt.Scanln()
		case 6:
			fmt.Println("Sesión cerrada")
			return
		default:
			fmt.Println("Opción inválida")
		}
	}

}

func verify(user string, password string) bool {
	if user == "admin" && password == "admin" {
		menuAdmin()
		return true
	} else {
		num, err := strconv.Atoi(user)
		if err != nil {
			fmt.Println("Error:", err)
		} else {
			if listaSistema.Login(num, password) {
				return true
			}
		}
		fmt.Println("\n **Datos incorrectos**")
		return false

	}
}

func logIn() {
	var user string
	var password string
	for {
		fmt.Println("\n╔══════════════════════╗")
		fmt.Println("║         Login        ║")
		fmt.Println("╚══════════════════════╝")
		fmt.Print("Ingrese el usuario: ")
		fmt.Scanln(&user)
		fmt.Print("Ingrese la contraseña: ")
		fmt.Scanln(&password)
		key := verify(user, password)

		if key {
			break
		}
	}

}

func menu_home() {

	var opcion int
	for {
		fmt.Println("\n╔══════════════════════╗")
		fmt.Println("║      EDD GoDrive     ║")
		fmt.Println("╚══════════════════════╝")
		fmt.Println(" 1.Iniciar sesión ")
		fmt.Println(" 2.Salir")

		fmt.Print("\nSeleccione una opción: ")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			logIn()
		case 2:
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opción inválida")
		}

	}

}
