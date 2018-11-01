import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory
} from "redux-manager-lib";

/*
* The Rest Client is a module that is specific to a model.
* It is implemented by the user. It is an object with methods for
* 'create', 'read', 'update' and 'delete'
*/
import blogRestClient from "./blog-post-rest-api";

/*
* We need to give the model some name
*/
const MODEL_NAME = "BlogPost";

/*
* To create the action types, we have to pass the factory the model name.
* It returns an object with the action types for crud operations.
*/
const actionTypes = actionTypesFactory(MODEL_NAME);

/*
* Action creators require the actionTypes and the restClient instance. Redux thunks
* are the default implementation, which is whay the rest client is required.
*/
const actionCreators = actionCreatorsFactory(actionTypes, blogRestClient);

/*
* The reducer factory only needs the actionTypes. It works as
* a normal reducer.
*/
const reducer = reducerFactory(actionTypes);

/*
* Selectors require no input. They include 'getOne', 'getSome', 'getAll'
* and others - that can be very useful.
*/
const selectors = selectorsFactory();

const BlogPost = {
  actionTypes,
  actionCreators,
  reducer,
  selectors
};

/*
* Now when we import the BlogPost model from a different file
* we have access to its:
*
* reducer        - BlogPost.reducer - so it is easy to connect it to the redux state
* actionCreators - BlogPost.actionCreators.read()
* selectors      - BlogPost.selectors.getAll(state)
*/
export default BlogPost;
