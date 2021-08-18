import { useDispatch } from "react-redux";
import { get } from "../modules/todo";

export default function useUpdateTodo() {
  const dispatch = useDispatch();
  const onUpdate = () => {
    dispatch(get());
  };
  return onUpdate;
}
