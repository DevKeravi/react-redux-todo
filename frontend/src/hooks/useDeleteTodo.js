import { useDispatch } from "react-redux";
import { DEL } from "../modules/todo";

export default function useDoneTodo() {
  const dispatch = useDispatch();

  const onDel = (payload) => {
    dispatch(DEL(payload));
  };
  return onDel;
}
