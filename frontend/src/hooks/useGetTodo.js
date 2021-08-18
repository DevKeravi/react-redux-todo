import { useSelector } from "react-redux";

export default function useGetTodo() {
  const todos = useSelector((state) => state.todo);
  return todos.data;
}
