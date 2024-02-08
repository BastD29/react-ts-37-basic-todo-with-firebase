import { useState } from "react";

import { TodoType } from "./models/Todo";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState<string>("");

  return (
    <div className="app">
      <TodoForm
        text={text}
        todos={todos}
        setTodos={setTodos}
        setText={setText}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
