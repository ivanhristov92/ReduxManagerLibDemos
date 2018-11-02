import React from "react"
import MUIDataTable from "mui-datatables";

import BlogPostModel from "./model-blog-post/model-blog-post";
import ModelDefinitionsModel from "./model-model-definitions";
import { connectModel } from "../utils";
import NewBlogPostForm from "./components/new-post-form";
import ModelEntriesList from "./components/model-entries-list";
import NewPostForm from "./components/new-post-form";
import * as _ from "ramda";


class ModelPage extends React.Component{

    componentWillMount(){
        this.props.ModelDefinitions.actionCreators.read();
        this.props.BlogPost.actionCreators.read();
    }

    render(){
        return (
            <>
              <ModelEntriesList model={this.props.BlogPost}/>
              <NewPostForm />
            </>
        )

    }

}


const BlogPostContainer =  {
    model: BlogPostModel,
    mapStateToProps(state){
        return {
            all: BlogPostModel.selectors.getAll(state),
            operationStates: BlogPostModel.selectors.getOperationStates(state),
            definition: BlogPostModel.selectors.getDefinition(state),
            error: BlogPostModel.selectors.getError(state),
            MODEL_NAME: BlogPostModel.MODEL_NAME
        }
    }
};
export default connectModel(
    [
        BlogPostContainer,
        ModelDefinitionsModel

    ]
)(ModelPage);

