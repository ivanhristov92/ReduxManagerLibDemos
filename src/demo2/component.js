import React from "react"

import BlogPostModel from "./model-blog-post/model-blog-post";
import NewBlogPostForm from "./components/new-post-form";
import ModelEntriesList from "./components/model-entries-list";

import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {pick, values, compose} from "ramda";


class ModelPage extends React.Component{
    componentWillMount(){
        this.props.readPosts();
    }

    // render(){
    //     let columns = [{Header: "ID", accessor: "id"}, {Header: "Title", accessor: "title"}, {Header: "Content", accessor: "content"}];
    //     let data = this.props.allPosts;
    //
    //     return (
    //         <>
    //           <ModelEntriesList modelName={BlogPostModel.MODEL_NAME} columns={columns} data={data}/>
    //           <NewBlogPostForm onSubmit={this.props.createPost} error={this.props.postsError}/>
    //         </>
    //     )
    //
    // }

    render(){
        let fields = ["id", "title", "content"];
        let data = this.props.allPosts.map(compose(values, pick(fields)));

        return (
            <>
                <ModelEntriesList
                    modelName={BlogPostModel.MODEL_NAME}
                    fields={fields}
                    data={data}
                    onEditClick={(selected)=>{
                        console.log(selected);
                        let entries = selected.map(s=>data[s.index])
                    }}
                    onDeleteClick={(selected)=>{
                        console.log(selected);
                        let entries = selected.map(s=>this.props.allPosts[s.index].id);
                        this.props.deletePosts(entries)
                    }}
                />
                <NewBlogPostForm onSubmit={this.props.createPost} error={this.props.postsError}/>
            </>
        )

    }

}

export default connect(function mapStateToProps(state){
    return {
        allPosts: BlogPostModel.selectors.getAll(state),
        postsError: BlogPostModel.selectors.getError(state),
    };
}, function mapDispatchToProps(dispatch){
    return bindActionCreators({
        readPosts: BlogPostModel.actionCreators.read,
        createPost: BlogPostModel.actionCreators.create,
        deletePosts: BlogPostModel.actionCreators.delete
    }, dispatch);
})(ModelPage);