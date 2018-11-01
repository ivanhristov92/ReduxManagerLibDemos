import React from "react";

export default class AnimationInfo extends React.Component {
  render() {
    return (
      <div>
        <p>showing animation: {"" + this.props.showAnimation}</p>
        <button onClick={this.props.model.showAnimation}>Show</button>
        <button onClick={this.props.model.stopShowingAnimation}>Stop</button>
        <button onClick={this.props.model.showAnimationTemporarily}>
          Show Temporarily
        </button>
      </div>
    );
  }
}
