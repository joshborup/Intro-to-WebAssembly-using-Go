package main

import (
	"fmt"
	"syscall/js"
)

// function definition
func add(this js.Value, i []js.Value) interface{} {
	fmt.Println(js.ValueOf(i[0].Int() + i[1].Int()))
	return js.ValueOf(i[0].Int() + i[1].Int())
}

func expensive(this js.Value, i []js.Value) interface{} {
	fmt.Println(js.ValueOf(i[0].Int()))
	num := i[0].Int()
	result := 1
	for i := 0; i < num; i++ {
		result = result * num
		for e := 0; e < num; e++ {
			if result%2 == 1 {

				result /= e
			}
			result *= num
		}
	}
	return 10000
}

func main() {
	// exposing to JS
	done := make(chan int)
	js.Global().Set("_myExpensiveGO", js.FuncOf(expensive))
	<-done
}
