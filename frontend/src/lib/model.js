import { Map, List, fromJS } from "immutable";
export const respToTodos = (resp) => {
  const todos = fromJS(resp.data);

  return todos;
};
