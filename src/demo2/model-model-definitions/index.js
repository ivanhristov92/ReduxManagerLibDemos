import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import restClient from "./rest-client-common";

const MODEL_NAME = "ModelDefinitions";
const actionTypes = actionTypesFactory(MODEL_NAME);
const actionCreators = actionCreatorsFactory(actionTypes, restClient);
const reducer = reducerFactory(actionTypes);
const selectors = bindSelectorsToState("modelDefinitions", selectorsFactory());

export default {
  actionTypes,
  actionCreators,
  reducer,
  selectors,
  MODEL_NAME
};
