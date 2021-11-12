// import requirements
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

// create new store
const store = createStore(rootReducer, applyMiddleware(thunk));

// export module
export default store;
