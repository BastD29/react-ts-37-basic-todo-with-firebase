import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { addTodo } from "../services/todo.service";
import { TodoResult } from "../models/Todo";

type FormProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

function TodoForm({ text, setText }: FormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (text === "") {
      inputRef.current?.focus();
    }
  }, [text]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);

    const result: TodoResult = await addTodo(text);

    if (result.success) {
      setText("");
      setError(null);
    } else {
      setError(result.error ?? null);
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add a new todo"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Add todo
      </button>
      {isLoading && <p>Adding...</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TodoForm;
