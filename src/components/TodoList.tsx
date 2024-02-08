import { useEffect, useState } from "react";

import TodoItem from "./TodoItem";

import { TodoType } from "../models/Todo";

import { subscribeToTodos } from "../services/todo.service";

export default function TodoList({}) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToTodos(
      (updatedTodos) => {
        setTodos(updatedTodos);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos. Please try again.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) return <p>Loading todos...</p>;

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
