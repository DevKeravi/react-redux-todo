import axios from "axios";

const todoApiUrl = "/api/todos";

//TODO
export const getPosts = async () => {
  const resp = await axios.get(todoApiUrl);
  return resp;
};

export const createPost = async (payload) => {
  const form = new FormData();
  form.append("payload", payload);
  const resp = await axios.post(todoApiUrl, form);
  return resp;
};
