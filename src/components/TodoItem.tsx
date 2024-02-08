import { useState, KeyboardEvent } from "react";

import { TodoResult, TodoType } from "../models/Todo";

import { deleteTodo, updateTodo } from "../services/todo.service";

type TodoItemProps = {
  todo: TodoType;
};

function TodoItem({ todo }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<TodoType["text"]>(todo.text);
  const [originalText, setOriginalText] = useState<TodoType["text"]>(todo.text);

  const date = todo.createdAt ? todo.createdAt.toDate() : new Date();
  const formattedDate = todo.createdAt
    ? date.toLocaleString()
    : "Date not available";

  const handleDelete = async (id: string): Promise<void> => {
    setIsLoading(true);

    const result: TodoResult = await deleteTodo(id);

    if (result.success) {
      setError(null);
    } else {
      setError(result.error ?? null);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, newText: string): Promise<void> => {
    setIsLoading(true);

    const result: TodoResult = await updateTodo(id, newText);

    if (result.success) {
      setError(null);
    } else {
      setError(result.error ?? null);
    }

    setIsLoading(false);
  };

  const handleEdit = async () => {
    if (isEditing && todo.id) {
      try {
        await handleUpdate(todo.id, editText);
        setOriginalText(editText);
      } catch (error) {
        console.error("Failed to update todo:", error);

        setEditText(originalText);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditText(originalText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEdit();
    } else if (event.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="todo-item">
      {error && <p className="error">{error}</p>}
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
        <p>created at: {formattedDate}</p>
      </div>
      <button
        className="delete-btn"
        onClick={() => {
          if (todo.id !== undefined) handleDelete(todo.id);
        }}
        disabled={isLoading}
      >
        X
      </button>
      {isEditing ? (
        <>
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Update</button>
      )}
    </div>
  );
}

export default TodoItem;
