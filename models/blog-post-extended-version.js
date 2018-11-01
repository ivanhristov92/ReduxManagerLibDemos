import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./blog-post-rest-api";

/*
////////////////
EXTENDED EXAMPLE
////////////////
*/

const MODULE_NAME = "BlogPost";

const actionTypes = actionTypesFactory(MODULE_NAME, {
  additional: {
    SHOW_ANIMATION: "SHOW_ANIMATION",
    STOP_SHOWING_ANIMATION: "STOP_SHOWING_ANIMATION"
  }
});

const restApi = moduleRestApi();

const actionCreatorsOptions = {
  additional: {
    showAnimation() {
      return { type: actionTypes.SHOW_ANIMATION };
    },
    stopShowingAnimation() {
      return { type: actionTypes.STOP_SHOWING_ANIMATION };
    },
    showAnimationTemporarily() {
      return function(dispatch) {
        dispatch({ type: actionTypes.SHOW_ANIMATION });
        setTimeout(() => {
          dispatch({ type: actionTypes.STOP_SHOWING_ANIMATION });
        }, 3000);
      };
    }
  }
};
const actionCreators = actionCreatorsFactory(
  actionTypes,
  restApi,
  actionCreatorsOptions
);

const reducer = reducerFactory(actionTypes, {
  defaultState: {
    showAnimation: "waiting..."
  },
  additional: {
    [actionTypes.SHOW_ANIMATION](state, action) {
      console.log("ee");
      return {
        ...state,
        showAnimation: true
      };
    },
    [actionTypes.STOP_SHOWING_ANIMATION](state, action) {
      return {
        ...state,
        showAnimation: false
      };
    }
  }
});

const selectors = bindSelectorsToState(
  "blog",
  selectorsFactory({
    additional: {
      getIsShowingAnimation(state) {
        return state.showAnimation;
      }
    }
  })
);

const BlogPost = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors,
  MODULE_NAME
};

export default BlogPost;
