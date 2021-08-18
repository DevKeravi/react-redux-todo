import { useDispatch } from "react-redux";
import { DONE } from "../modules/todo";

export default function useDoneTodo(payload) {
  const dispatch = useDispatch();
  const useDel = (payload) => {
    dispatch(DONE(payload));
  };
  return useDel;
}
