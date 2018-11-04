import React from "react";

export default class ModelStateMonitor extends React.Component {
  render() {
    let model = Object.values(this.props)[0];

    return (
      <div>
        <p>{model.MODEL_NAME}</p>
        <ul>
          <li>create: {model.operationStates.create}</li>
          <li>read: {model.operationStates.read}</li>
          <li>update: {model.operationStates.update}</li>
          <li>delete: {model.operationStates.delete}</li>
        </ul>
        <div>error: {"" + (model.error && model.error.message)}</div>
      </div>
    );
  }
}
