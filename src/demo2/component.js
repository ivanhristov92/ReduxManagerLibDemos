import React from "react"

import BlogPostModel from "./model-blog-post/model-blog-post";
import NewBlogPostForm from "./components/new-post-form";
import EditBlogPostForm from "./components/edit-post-form";
import ModelEntriesList from "./components/model-entries-list";

import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {pick, values, compose} from "ramda";


class ModelPage extends React.Component{

    state = {
        selected: [],
        openEdit: false
    };

    onRowsSelect = (current, selected)=>{
        this.setState({
            selected
        })
    };

    onEditClicked = () => {
        this.setState({
            openEdit: true
        })
    }

    componentWillMount(){
        this.props.readPosts();
    }

    mapSelectedToEntries = () => {
        return this.state.selected.map(({index})=>{
            return this.props.allPosts[index];
        })
    }

    render(){
        let fields = ["id", "title", "content"];
        let data = this.props.allPosts.map(compose(values, pick(fields)));
        return (
            <>
                <ModelEntriesList
                    modelName={BlogPostModel.MODEL_NAME}
                    fields={fields}
                    data={data}
                    onRowsSelect={this.onRowsSelect}
                    onEditClick={this.onEditClicked}
                    onDeleteClick={(selected)=>{
                        console.log(selected);
                        let entries = selected.map(s=>this.props.allPosts[s.index].id);
                        this.props.deletePosts(entries)
                    }}
                />
                {
                    this.state.openEdit ? (
                        <EditBlogPostForm entries={this.mapSelectedToEntries()} error={this.props.postsError}/>
                    ) : (
                        <NewBlogPostForm onSubmit={this.props.createPost} error={this.props.postsError}/>
                    )
                }


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