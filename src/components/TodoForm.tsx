import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

import { TodoType } from "../models/Todo";

type FormProps = {
  text: string;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  setText: Dispatch<SetStateAction<string>>;
};

function TodoForm({ text, todos, setTodos, setText }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo: TodoType = { id: Date.now(), text, isCompleted: false };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add a new todo"
      />
      <button type="submit">Add todo</button>
    </form>
  );
}

export default TodoForm;
