import { Dispatch, SetStateAction } from "react";

import { TodoType } from "../models/Todo";

import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id: number, newText: string): void => {
    const newTodos: TodoType[] = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );

    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
