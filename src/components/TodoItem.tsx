import { useState, KeyboardEvent } from "react";

import { TodoType } from "../models/Todo";

type TodoItemProps = {
  todo: TodoType;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, newText: string) => void;
};

function TodoItem({ todo, handleDelete, handleUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<TodoType["text"]>(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      handleUpdate(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") handleEdit();
  };

  return (
    <div className="todo-item">
      <div className="details">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h1>todo: {todo.text}</h1>
        )}
        <p>id: {todo.id}</p>
      </div>
      <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
        X
      </button>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Update"}</button>
    </div>
  );
}

export default TodoItem;
