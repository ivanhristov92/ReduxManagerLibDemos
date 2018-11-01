import { connectModel } from "../utils";
import ModelEntriesList from "./model-entries-list";
import BlogPostModel from "../../models/blog-post";

/*
//////////////
SIMPLE EXAMPLE
//////////////
*/

export default connectModel(BlogPostModel)(ModelEntriesList);
