import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./rest-client-blog-post";

/*
////////////////
EXTENDED EXAMPLE
////////////////
*/

import ModelDefinitionsModel from "../model-model-definitions";

const MODEL_NAME = "BlogPost";

const actionTypes = actionTypesFactory(MODEL_NAME, {
  additional: {
    SHOW_ANIMATION: "SHOW_ANIMATION",
    STOP_SHOWING_ANIMATION: "STOP_SHOWING_ANIMATION"
  }
});

const restApi = moduleRestApi();

const actionCreators = actionCreatorsFactory(actionTypes, restApi);

const reducer = reducerFactory(actionTypes, {
  defaultState: {
    definition: null
  },
  additional: {
    [ModelDefinitionsModel.actionTypes.READ__SUCCESS](state, action) {
      return {
        ...state,
        definition: action.payload.byId[MODEL_NAME]
      };
    }
  }
});

const selectors = bindSelectorsToState(
  "blog",
  selectorsFactory({
    additional: {
      getDefinition(state) {
        return state.definition;
      }
    }
  })
);

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
