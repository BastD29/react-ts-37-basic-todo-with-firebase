import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase-config";

import { TodoResult, TodoType } from "../models/Todo";

const todosCollectionRef = collection(db, "todos");

function subscribeToTodos(
  onTodosChanged: (todos: TodoType[]) => void,
  onError: (error: Error) => void
): () => void {
  const q = query(todosCollectionRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const todosArray: TodoType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        isCompleted: doc.data().isCompleted,
        createdAt: doc.data().createdAt,
      }));
      onTodosChanged(todosArray);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
}

async function addTodo(text: string): Promise<TodoResult> {
  try {
    await addDoc(collection(db, "todos"), {
      text: text,
      isCompleted: false,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding todo:", error);
    return { success: false, error: "Failed to add todo. Please try again." };
  }
}

async function deleteTodo(id: string): Promise<TodoResult> {
  try {
    await deleteDoc(doc(todosCollectionRef, id));

    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      error: "Failed to delete todo. Please try again.",
    };
  }
}

async function updateTodo(id: string, text: string): Promise<TodoResult> {
  try {
    await updateDoc(doc(todosCollectionRef, id), { text: text });

    return { success: true };
  } catch (error) {
    console.error("Error updating todo:", error);
    return {
      success: false,
      error: "Failed to update todo. Please try again.",
    };
  }
}

export { subscribeToTodos, addTodo, deleteTodo, updateTodo };
