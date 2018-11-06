import React from "react";

import BlogPostModel from "./model-blog-post/model-blog-post";
import NewBlogPostForm from "./components/new-post-form";
import EditBlogPostForm from "./components/edit-post-form";
import ModelEntriesList from "./components/model-entries-list";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pick, values, compose } from "ramda";

import AppBar from "./components/app-bar";
import Instructions from "./components/instructions";
import CodeSnippets from "./components/code-snippets";
import Paper from "@material-ui/core/Paper";
import Plain from "slate-plain-serializer";
import { Value } from "slate";
import { html } from "./components/serializers";

class ModelPage extends React.Component {
  state = {
    selected: [],
    openEdit: false
  };

  componentWillMount() {
    this.props.readPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleteState !== this.props.deleteState) {
      if (this.props.deleteState === "SUCCESS") {
        this.onSuccessfulDelete();
      }
    }
  }

  // layout events ////
  onRowsSelect = (current, selected) => {
    this.setState({
      selected
    });
  };

  onEditClicked = () => {
    this.setState({
      openEdit: true
    });
  };

  onCancelEdit = () => {
    this.setState({
      openEdit: false
    });
  };
  //////////////////////
  // Action Events /////

  onDelete = () => {
    let entries = this.state.selected.map(s => this.props.allPosts[s.index].id);
    this.props.deletePosts(entries);
  };

  onSuccessfulDelete = () => {
    this.setState({
      selected: []
    });
  };

  onSuccessfulCreate = () => {
    this.setState({
      selected: []
    });
  };

  onUpdate = ({ title, content }) => {
    let entries = this.state.selected.map(s => {
      return {
        id: this.props.allPosts[s.index].id,
        content,
        title
      };
    });
    this.props.updatePosts(entries);
  };

  //////////////////////

  render() {
    let fields = ["id", "title", "content"];
    let data = this.props.allPosts.map(
      compose(
        values,
        obj => {
          return {
            ...obj,
            content: Plain.serialize(Value.fromJSON(JSON.parse(obj.content)))
          };
        },
        pick(fields)
      )
    );
    console.log(data);
    return (
      <>
        <AppBar />

        <Instructions />

        <div id={"model-wrapper"}>
          <ModelEntriesList
            modelName={BlogPostModel.MODEL_NAME}
            fields={fields}
            data={data}
            onRowsSelect={this.onRowsSelect}
            onEditClick={this.onEditClicked}
            onDeleteClick={this.onDelete}
          />
          {this.state.openEdit ? (
            <EditBlogPostForm
              onSubmit={this.onUpdate}
              entries={this.mapSelectedToEntries()}
              error={this.props.postsError}
              onCancelEdit={this.onCancelEdit}
            />
          ) : (
            <NewBlogPostForm
              onSubmit={this.props.createPost}
              error={this.props.postsError}
              createState={this.props.createState}
            />
          )}
        </div>
        <CodeSnippets />
      </>
    );
  }

  // Helper methods /////

  mapSelectedToEntries = () => {
    return this.state.selected.map(({ index }) => {
      return this.props.allPosts[index];
    });
  };
}

export default connect(
  function mapStateToProps(state) {
    return {
      allPosts: BlogPostModel.selectors.getAll(state),
      postsError: BlogPostModel.selectors.getError(state),
      deleteState: BlogPostModel.selectors.getOperationStates(state).delete,
      createState: BlogPostModel.selectors.getOperationStates(state).create
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        readPosts: BlogPostModel.actionCreators.read,
        createPost: BlogPostModel.actionCreators.create,
        updatePosts: BlogPostModel.actionCreators.update,
        deletePosts: BlogPostModel.actionCreators.delete
      },
      dispatch
    );
  }
)(ModelPage);
