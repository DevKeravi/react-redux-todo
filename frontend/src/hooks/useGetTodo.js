import { useSelector } from "react-redux";

export default function useGetTodo() {
  const todos = useSelector((state) => state.toJS());
  return todos;
}
