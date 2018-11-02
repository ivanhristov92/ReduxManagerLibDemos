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
            <div style={{padding: 40, textAlign: "center", color: "red"}}>{"" + this.props.ModelDefinitions.error || null}</div>
            </>)

    }

}
export default connectModel([BlogPostModel, ModelDefinitionsModel])(ModelEntriesList);