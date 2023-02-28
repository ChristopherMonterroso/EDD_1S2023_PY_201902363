package queue

import "fase1.com/fase1/structs"

type BitNode struct {
	Bit  *structs.Bitacora
	Next *BitNode
}
