import React from "react";

export default class ModelStateMonitor extends React {
    render(){
        let modelName = this.props.modelName;
        let model = this.props[modelName];
        return (
            <div>
                <p>{model.modelName}</p>
                <ul>
                    <li>create: {model.operationStates.create}</li>
                    <li>read: {model.operationStates.read}</li>
                    <li>update: {model.operationStates.update}</li>
                    <li>delete: {model.operationStates.delete}</li>
                </ul>
                <div>error: {"" + model.error}</div>

            </div>
        )
    }
}