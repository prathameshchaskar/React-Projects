import { useState, useEffect} from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    //accesing older array elements
    setTodos((prev) =>[{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    //get prev array state... loop/map through it.. prevTodo is an element(eachtodo) so using condition we get id
    setTodos((prev) => prev.map((prevTodo) => 
    (prevTodo.id === id ? todo : prevTodo)))
  } 

  const deleteTodo = (id) => {
    //instead of using map we are using filter to delete
    //filter works on true statemment
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => 
    (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))) //get all values then override it
  }

  // const isJson = (str) => {
  //   try {
  //       JSON.parse(str);
  //   } catch (e) {
  //       return false;
  //   }
  //   return true;
  // }

  useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos"))
      
      if(todos && todos.length > 0){
        setTodos(todos)
      }
  
      // const check = localStorage.getItem("todos")
      // if(check && isJson(check)){
      //   setTodos(JSON.parse(check))
      // }

    }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}

            {todos.map((todo) => (
              <div key={todo.id} className="w-full"> 
                <TodoItem todo={todo}/>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
