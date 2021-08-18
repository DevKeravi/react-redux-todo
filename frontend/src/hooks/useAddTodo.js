import { useDispatch } from "react-redux";
import { ADD } from "../modules/todo";

export default function useAddTodo() {
  const dispatch = useDispatch();
  const onAdd = (payload) => dispatch(ADD(payload));
  return onAdd;
}
