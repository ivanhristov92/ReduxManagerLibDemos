import React from "react";
import { connectModel } from "../utils";
import ModelEntriesList from "./model-entries-list";
import BlogPostModel from "../../models/blog-post-extended-version";
import AnimationInfo from "./animation-info";

class ExtendedModelEntriesList extends React.Component {
  render() {
    return (
      <ModelEntriesList {...this.props}>
        <AnimationInfo {...this.props} />
      </ModelEntriesList>
    );
  }
}

/*
////////////////
EXTENDED EXAMPLE
////////////////
 */

const additionalStateToPorps = state => ({
  showAnimation: BlogPostModel.selectors.getIsShowingAnimation(state)
});
export default connectModel(BlogPostModel, additionalStateToPorps)(
  ExtendedModelEntriesList
);
