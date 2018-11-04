import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./rest-client-blog-post";

const MODEL_NAME = "BlogPost";

const actionTypes = actionTypesFactory(MODEL_NAME, {
  additional: {
    SHOW_ANIMATION: "SHOW_ANIMATION",
    STOP_SHOWING_ANIMATION: "STOP_SHOWING_ANIMATION"
  }
});

const restApi = moduleRestApi();

const actionCreators = actionCreatorsFactory(actionTypes, restApi);

const reducer = reducerFactory(actionTypes);

const selectors = bindSelectorsToState("blog", selectorsFactory());

const ModelBlogPost = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors,
  MODEL_NAME
};
console.log(ModelBlogPost);

export default ModelBlogPost;
