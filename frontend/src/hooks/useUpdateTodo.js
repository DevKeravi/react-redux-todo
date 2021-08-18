import { useDispatch } from "react-redux";
import { GET } from "../modules/todo";

export default function useUpdateTodo() {
  const dispatch = useDispatch();
  const onUpdate = () => {
    dispatch(GET());
  };
  return onUpdate;
}
