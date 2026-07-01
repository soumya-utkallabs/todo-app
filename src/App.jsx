import { useState } from "react";

import "./App.css";

function App() {
  let [todolist, setTodolist] = useState([]);
  

  let saveTodoList = (event) => {
    let TodoName = event.target.TodoName.value;
    if (!todolist.includes(TodoName)) {
      let finalTodolist = [...todolist, TodoName];
      setTodolist(finalTodolist);
    } else {
      alert("already Exists!");
    }
    event.preventDefault();
  };

  let list = todolist.map((value, index) => {
    return <Todolistitems value={value} key={index} indexNumber = {index} todolist = {todolist} setTodolist = {setTodolist} />;
  });

  return (
    <>
      <div className="todo-app">
        <h1>Todo App</h1>

        <form className="todo-form" onSubmit={saveTodoList}>
          <input type="text" name="TodoName" placeholder="Enter a task..." />
          <button type="submit">Add</button>
        </form>

        <ul className="todo-list">{list}</ul>
      </div>
    </>
  );
}

export default App;

function Todolistitems({ value, indexNumber, todolist, setTodolist }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  let deleteRow = () => {
    let finalData = todolist.filter((v,i)=>i!=indexNumber)
    setTodolist(finalData)
    
  }
  let editRow = () => {
    setIsEditing(true);
  };

  let saveEdit = () => {
    let updatedList = [...todolist];
    updatedList[indexNumber] = editValue;
    setTodolist(updatedList);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {
  isEditing ? (
    <input
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
    />
  ) : (
    <span className="todo-text">{value}</span>
  )
}

      <div className="action-buttons">
  {isEditing ? (
    <button className="action-btn edit" onClick={saveEdit}>
      Save
    </button>
  ) : (
    <button className="action-btn edit" onClick={editRow}>
      <i className="fa-solid fa-pen-to-square"></i>
      <span>Edit</span>
    </button>
  )}

  <button className="action-btn delete" onClick={deleteRow}>
    <i className="fa-solid fa-trash"></i>
    <span>Delete</span>
  </button>
</div>
    </div>
  );
}
