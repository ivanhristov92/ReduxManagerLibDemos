import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class NewBlogPostForm extends React.Component {
    render(){
        return (
            <div style={{textAlign: "center"}}>
                <p>
                </p>
                <div>
                <TextField
                    id="title"
                    label="Title"
                    margin="normal"
                    variant="outlined"
                />
                </div>
                <div>
                <TextField
                    id="content"
                    label="Content"
                    multiline
                    rowsMax="10"
                    margin="normal"
                    variant="outlined"
                />
                </div>

                <div>
                    <Button variant="contained" color="primary" >
                        Primary
                    </Button>
                </div>
            </div>
        )
    }
}