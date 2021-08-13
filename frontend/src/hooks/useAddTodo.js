import { useDispatch } from "react-redux";
import { add } from "../modules/todo";

export default function useAddTodo() {
  const dispatch = useDispatch();
  const onAdd = (payload) => dispatch(add(payload));
  return onAdd;
}
