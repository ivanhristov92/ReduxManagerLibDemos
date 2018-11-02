import React from "react";
import MUIDataTable from "mui-datatables";
import * as _ from "ramda";

const options = {
    filterType: 'checkbox',
};

const extractColumns = _.compose(
    _.keys,
    _.pathOr({}, ["definition", "BlogPost", "properties"])
);

const extractData = model => model.all.map(_.values);

export default class ModelEntriesList extends React.Component{

    componentWillMount(){
    }

    render(){


        let columns = extractColumns(this.props.model);

        let data = extractData(this.props.model);
console.log(this.props.model)
        let title = this.props.model.MODEL_NAME;
        return (
            <>
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns}
                    options={options}
                />

            </>)

    }

}