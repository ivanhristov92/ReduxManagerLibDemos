import BlogPostModel from "./model-blog-post/model-blog-post";
import { connectModel } from "../utils";
import ModelEntriesList from "./components/model-entries-list";

export default connectModel(BlogPostModel)(ModelEntriesList);

