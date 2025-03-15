/***************************************************/
/************** ALGORITHMS JSON ********************/
/***************************************************/
export const algorithms =  {
      "searching": {
        "binary_search": {
          "name": "Binary Search",
          "algo_key":"binary_search",
          "description": "Efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
          "code": "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
          "time_complexity": "O(log n)",
          "space_complexity": "O(1)"
        },
        "linear_search": {
          "name": "Linear Search",
          "algo_key":"linear_search",
          "description": "Simple search algorithm that checks each element in sequence until a match is found.",
          "code": "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}",
          "time_complexity": "O(n)",
          "space_complexity": "O(1)"
        }
      },
      "sorting": {
        "bubble_sort": {
          "name": "Bubble Sort",
          "algo_key":"bubble_sort",
          "description": "Simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
          "code": "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
          "time_complexity": "O(n^2)",
          "space_complexity": "O(1)"
        },
        "insertion_sort": {
          "name": "Insertion Sort",
          "algo_key":"insertion_sort",
          "description": "A sorting algorithm that builds the final sorted array one item at a time.",
          "code": "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}",
          "time_complexity": "O(n^2)",
          "space_complexity": "O(1)"
        },
        "merge_sort": {
          "name": "Merge Sort",
          "algo_key":"merge_sort",
          "description": "Divide-and-conquer sorting algorithm that splits the array into halves, sorts them, and then merges them back together.",
          "code": "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  let result = [], i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i] < right[j] ? left[i++] : right[j++]);\n  }\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}",
          "time_complexity": "O(n log n)",
          "space_complexity": "O(n)"
        }
      },
      "graph": {
        "dijkstra": {
          "name": "Dijkstra's Algorithm",
          "algo_key":"dijkstra_graph",
          "description": "An algorithm for finding the shortest paths from a single source vertex to all other vertices in a weighted graph.",
          "code": "function dijkstra(graph, start) {\n  const distances = {};\n  const visited = {};\n  const pq = new PriorityQueue();\n  graph.forEach((_, node) => (distances[node] = Infinity));\n  distances[start] = 0;\n  pq.enqueue(start, 0);\n  while (!pq.isEmpty()) {\n    let { node } = pq.dequeue();\n    if (visited[node]) continue;\n    visited[node] = true;\n    for (let neighbor in graph[node]) {\n      let newDist = distances[node] + graph[node][neighbor];\n      if (newDist < distances[neighbor]) {\n        distances[neighbor] = newDist;\n        pq.enqueue(neighbor, newDist);\n      }\n    }\n  }\n  return distances;\n}",
          "time_complexity": "O((V + E) log V)",
          "space_complexity": "O(V + E)"
        }
      },
      "recursion": {
        "factorial": {
          "name": "Factorial",
          "algo_key":"factorial_recursion",
          "description": "Computes the factorial of a number using recursion.",
          "code": "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
          "time_complexity": "O(n)",
          "space_complexity": "O(n)"
        },
        "fibonacci": {
          "name": "Fibonacci",
          "algo_key":"fibonacci_recursion",
          "description": "Computes the nth Fibonacci number using recursion.",
          "code": "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
          "time_complexity": "O(2^n)",
          "space_complexity": "O(n)"
        },
        "tower_of_hanoi": {
          "name": "Tower of Hanoi",
          "algo_key":"tower_of_hanoi_recursion",
          "description": "Solves the Tower of Hanoi puzzle recursively.",
          "code": "function hanoi(n, from, to, aux) {\n  if (n === 1) {\n    console.log(`Move disk 1 from ${from} to ${to}`);\n    return;\n  }\n  hanoi(n - 1, from, aux, to);\n  console.log(`Move disk ${n} from ${from} to ${to}`);\n  hanoi(n - 1, aux, to, from);\n}",
          "time_complexity": "O(2^n)",
          "space_complexity": "O(n)"
        }
      }
    }
