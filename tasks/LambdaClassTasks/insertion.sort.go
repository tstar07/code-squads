package main

import "fmt"

func insertionSort(arr []int) []int {
	fmt.Println("Current given arr:", arr)
	for i := 1; i < len(arr); i++ {
		current := arr[i]
		j := i - 1

		for j > 0 && arr[j] > current {
			arr[j+1] = arr[j]
			j--
		}

		arr[j+1] = current

	}
	fmt.Println("Current sorted arr:", arr)
	return arr

}

func main() {

	fmt.Println("Hello, Go")
	insertionSort([]int{5, 3, 6, 2, 1})
	insertionSort([]int{9, 7, 5, 3, 1})

}
