import combineReducers from "./reducers/index";
import { createStore } from "redux";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

// export default createStore(combineReducers, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

export default createStore(combineReducers);
