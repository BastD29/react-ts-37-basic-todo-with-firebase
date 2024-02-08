import { Timestamp } from "firebase/firestore";

export type TodoType = {
  id?: string;
  text: string;
  isCompleted: boolean;
  createdAt: Timestamp;
};

export type TodoResult =
  | {
      success: boolean;
      error?: undefined;
    }
  | {
      success: boolean;
      error: string;
    };
