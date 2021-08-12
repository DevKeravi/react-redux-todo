import { useDispatch } from "react-redux";
import { done } from "../modules/todo";

export default function useDoneTodo(payload) {
  const dispatch = useDispatch();
  const useDel = (payload) => {
    dispatch(done(payload));
  };
  return useDel;
}
