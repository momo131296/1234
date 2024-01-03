function TodoItem({ todo, Edit, Del }) {
    return (
      <div className="content-item">
        <div className="content-span">
          <span className="title">{todo.todo}</span>
          <span className="status">
            {todo.done ? "Complete" : "Active"}
          </span>
        </div>
        <div className="button-editor">
          <button className="edit" onClick={() => Edit(todo)}>
            Done
          </button>
          <button className="del" onClick={() => Del(todo)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TodoItem;