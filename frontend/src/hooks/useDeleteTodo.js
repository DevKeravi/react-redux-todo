import { useDispatch } from "react-redux";
import { del } from "../modules/todo";

export default function useDoneTodo() {
  const dispatch = useDispatch();

  const onDel = (payload) => {
    dispatch(del(payload));
  };
  return onDel;
}
