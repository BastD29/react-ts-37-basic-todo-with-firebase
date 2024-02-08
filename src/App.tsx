import { useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [text, setText] = useState<string>("");

  return (
    <div className="app">
      <TodoForm text={text} setText={setText} />
      <TodoList />
    </div>
  );
}
