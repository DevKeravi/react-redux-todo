import axios from "axios";
import { respToTodos } from "../lib/model";

const todoApiUrl = "/api/todos";

//TODO
export const getPosts = async () => {
  const resp = await axios.get(todoApiUrl);
  const todos = respToTodos(resp);
  return todos;
};

export const createPost = async (payload) => {
  const form = new FormData();
  form.append("payload", payload);
  const resp = await axios.post(todoApiUrl, form);
  return resp;
};
