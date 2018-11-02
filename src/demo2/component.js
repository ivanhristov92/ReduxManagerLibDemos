import React from "react"
import MUIDataTable from "mui-datatables";

import BlogPostModel from "./model-blog-post/model-blog-post";
import ModelDefinitionsModel from "./model-model-definitions";
import { connectModel } from "../utils";
const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filterType: 'checkbox',
};

class ModelEntriesList extends React.Component{

    componentWillMount(){
        console.log(this.props)
        this.props.ModelDefinitions.read();
    }

    render(){
        return (
            <>
            <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />


                <div>
                    <p>{this.props.ModelDefinitions.modelName}</p>
                    <ul>
                        <li>create: {this.props.ModelDefinitions.operationStates.create}</li>
                        <li>read: {this.props.ModelDefinitions.operationStates.read}</li>
                        <li>update: {this.props.ModelDefinitions.operationStates.update}</li>
                        <li>delete: {this.props.ModelDefinitions.operationStates.delete}</li>
                    </ul>
                    <div>error: {"" + (this.props.ModelDefinitions.error && this.props.ModelDefinitions.error.message)}</div>

                </div>
                <hr />
                <div>
                    <p>{this.props.BlogPost.modelName}</p>
                    <ul>
                        <li>create: {this.props.BlogPost.operationStates.create}</li>
                        <li>read: {this.props.BlogPost.operationStates.read}</li>
                        <li>update: {this.props.BlogPost.operationStates.update}</li>
                        <li>delete: {this.props.BlogPost.operationStates.delete}</li>
                    </ul>
                    <div>error: {"" + this.props.BlogPost.error}</div>

                </div>

            </>)

    }

}
export default connectModel([BlogPostModel, ModelDefinitionsModel])(ModelEntriesList);