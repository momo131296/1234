import { useEffect, useState } from "react";
import "./todo.scss";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(-1);
  const [messErr, setMessErr] = useState("");
  const handlerChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    
    const data = JSON.parse(localStorage.getItem("todos"));
    console.log(data);
    setTodos(data || []);
  }, []);

  useEffect(() => {
    if (!value) {
      console.log("K được để trống");
      setMessErr("K được để trống");
    } else {
      setMessErr("");
    }
  }, [value]);
  const AddTodo = () => {
    if (messErr) return;
    const newTodo = {
      id: new Date().getTime(),
      todo: value,
      done: false,
    };
   
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    setValue("");
  };
  const EditTodo = () => {
    todos.forEach((todo) => {
      if (todo.id === editId) {
        todo.done = value;
      }
    });
    setTodos([...todos]);
    localStorage.setItem("todos", JSON.stringify([...todos]));
    
  };
  const Del = (todo) => {
    const newTodos = todos.filter((item) => item.id !== todo.id);

    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const Edit = (todo) => {
    todo.done = !todo.done
    setEditId(todo.id);
    localStorage.setItem("todos", JSON.stringify([...todos]));
    
  };
  return (
    <div className="todo-list">
      <h1>TODOLIST</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <input type="text" value={value} onChange={handlerChange} />
          <p className="message-error" style={{ color: "red" }}>
            {messErr}
          </p>
        </div>
        <button onClick={ () => AddTodo() }>
         {"Add" }

        </button>
      </div>
      <div className="content-box">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} Edit={Edit} Del={Del}></TodoItem>
        ))}
      </div>
    </div>
  );
}

export default TodoList;