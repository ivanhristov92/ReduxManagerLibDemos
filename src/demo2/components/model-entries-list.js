import React from "react";
import MUIDataTable from "mui-datatables";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";


export default class ModelEntriesList extends React.Component{

    state = {
        selected: []
    };

    onRowSelect = (current, selected, self ) =>{
        this.setState({
            selected: selected
        })
    };

    onDeleteClick = () => {
        this.props.onDeleteClick(this.state.selected)
    };


    onEditClick = () => {
        this.props.onEditClick(this.state.selected)
    };

    render(){
        console.log(this.state)
        const options = {
            filterType: 'checkbox',
            sort: true,
            customToolbarSelect: ()=><div style={{display: "flex"}}>
                <Tooltip title={"opsa"}>
                    <IconButton  onClick={this.onEditClick}>
                        <EditIcon />
                    </IconButton>

                </Tooltip>

                <Tooltip title={"opsa"}>
                    <IconButton  onClick={this.onDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>,

            onRowsSelect:this.onRowSelect,

            onRowsDelete: console.log

        };

        let columns = this.props.fields;
        let data = this.props.data;
        let title = this.props.modelName;

        return (
            <>
                <MUIDataTable
                    ref={(table)=>{this.table = table}}
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

