import { combineReducers } from "redux";

import User from "../models/user";
import BlogPost from "../models/blog-post-extended-version";

export default combineReducers({
  user: User.reducer,
  blog: BlogPost.reducer
});
