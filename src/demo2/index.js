import React from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import Demo from "./component";
import BlogPostModel from "./model-blog-post/model-blog-post";
import ModelDefinitionsModel from "./model-model-definitions";

import { attachAnUnexpectedErrorLogger } from "redux-manager-lib";

const reducers = combineReducers({
  blog: BlogPostModel.reducer,
  modelDefinitions: ModelDefinitionsModel.reducer
});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Demo />
      </Provider>
    );
  }
}

attachAnUnexpectedErrorLogger();
document.addEventListener("unexpectedruntimeerror", reduxManagerLibError => {
  alert("Unexpected Runtime Error - Check the console");
});
