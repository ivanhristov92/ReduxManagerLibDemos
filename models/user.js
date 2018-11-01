import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./user-rest-api";

/*
//////////////
SIMPLE EXAMPLE
//////////////

const MODULE_NAME = "User";
const actionTypes = actionTypesFactory(MODULE_NAME, {});
const restApi = moduleRestApi();
const actionCreators = actionCreatorsFactory(actionTypes, restApi, {});
const reducer = reducerFactory(actionTypes, {});
const selectors = bindSelectorsToState("user", selectorsFactory());

const User = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors
};

export default User;
*/

/*
////////////////
EXTENDED EXAMPLE
////////////////
*/

////// Extensions ///////
const additionalActionTypes = { PROMPT_USER: "PROMPT_USER" };
const additionalActionCreators = {
  promptUser(message) {
    return function(dispatch) {
      dispatch({
        type: additionalActionTypes.PROMPT_USER
      });
      prompt(message);
    };
  }
};
const reducerOptions = {
  additionalActions: {
    [additionalActionTypes.PROMPT_USER](state, action) {
      debugger;
      return {
        ...state,
        userPrompted: true
      };
    }
  }
};

const selectorsOptions = {
  additional: {
    getIsPrompted(state) {
      return state.userPrompted;
    }
  }
};

/////////////////////////

const MODULE_NAME = "User";
const actionTypes = actionTypesFactory(MODULE_NAME, additionalActionTypes);
const restApi = moduleRestApi();
const actionCreators = actionCreatorsFactory(
  actionTypes,
  restApi,
  additionalActionCreators
);
const reducer = reducerFactory(actionTypes, reducerOptions);
const selectors = selectorsFactory(selectorsOptions);
const boundSelectors = bindSelectorsToState("user", selectors);

const User = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors: boundSelectors
};

export default User;
