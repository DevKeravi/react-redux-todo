import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

const ADD = "todo/ADD";
const DEL = "todo/DEL";
const GET = "todo/GET";
const DONE = "todo/DONE";

export const add = createAction(ADD);
export const del = createAction(DEL);
export const get = createAction(GET);
export const done = createAction(DONE);

const initialState = List([
  Map({
    text: "",
    date: "",
    id: null,
    isdone: false,
  }),
]);

export default handleActions(
  {
    [ADD]: (state, action) => {
      return state.push(Map(action.payload));
    },
    [DEL]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.get("id") === action.payload.id
      );
      return state.delete(index);
    },
    [GET]: (state, action) => {
      const index = state.findIndex((todo) => todo.get("text") === "");

      console.log(index);
      return state.delete(index);
    },
    [DONE]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.get("id") === action.payload.id
      );
      return state.setIn([index, "isdone"], !state.getIn([index, "isdone"]));
    },
  },
  initialState
);
