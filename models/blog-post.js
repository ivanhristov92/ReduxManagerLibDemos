import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./blog-post-rest-api";

/*
//////////////
SIMPLE EXAMPLE
//////////////
*/

const MODULE_NAME = "BlogPost";
const actionTypes = actionTypesFactory(MODULE_NAME);
const restApi = moduleRestApi();
const actionCreators = actionCreatorsFactory(actionTypes, restApi);
const reducer = reducerFactory(actionTypes);
const selectors = bindSelectorsToState("blog", selectorsFactory());

const BlogPost = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors,
  MODULE_NAME
};

export default BlogPost;
