import React from "react";
import MUIDataTable from "mui-datatables";

const options = {
    filterType: 'checkbox',
    sort: true
};
export default class ModelEntriesList extends React.Component{

    componentWillMount(){
    }

    render(){

        let columns = this.props.fields;
        let data = this.props.data;
        let title = this.props.modelName;

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


// import React from "react";
// import { render } from "react-dom";
// import { makeData, Logo, Tips } from "./Utils";
//
// // Import React Table
// import ReactTable from "react-table";
// import "react-table/react-table.css";
//
// export default class App extends React.Component {
//
//     renderEditable = (cellInfo) => {
//         return (
//             <div
//                 style={{ backgroundColor: "#fafafa" }}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={e => {
//                     const data = [...this.props.data];
//                     data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
//                     this.setState({ data });
//                 }}
//                 dangerouslySetInnerHTML={{
//                     __html: this.props.data[cellInfo.index][cellInfo.column.id]
//                 }}
//             />
//         );
//     }
//     render() {
//         const { data } = this.props;
//         return (
//             <div>
//
//                 <p>{this.props.modelName}</p>
//                 <ReactTable
//                     data={data}
//                     columns={this.props.columns.map(c=>({...c, Cell: this.renderEditable}))}
//                     defaultPageSize={10}
//                     className="-striped -highlight"
//                 />
//             </div>
//         );
//     }
// }

