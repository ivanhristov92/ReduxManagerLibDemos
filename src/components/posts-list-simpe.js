import React from "react";
import connect from "react-redux/es/connect/connect";
import BlogPostModel from "./blog-post";

class BlogPostComponent extends React.Component {
  componentWillMount() {
    this.props.readPosts();
  }

  render() {
    return (
      <ul>
        {(this.props.allPosts || []).map(post => {
          return <li>{post.title}</li>;
        })}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: BlogPostModel.selectors.getAll(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readPosts: () => dispatch(BlogPostModel.actionCreators.read())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostComponent);
