import { useDispatch } from "react-redux";
import { INITALIZE_WS_CHANNEL } from "../modules/todo";

export default function useWebSocket() {
  const dispatch = useDispatch();
  const onWebSocket = () => {
    dispatch(INITALIZE_WS_CHANNEL());
  };
  return onWebSocket;
}
