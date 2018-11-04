import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

export default class NewBlogPostForm extends React.Component {
  state = {
    title: "",
    content: ""
  };

  handleChange = name => {
    return e => {
      this.setState({
        [name]: e.target.value
      });
    };
  };

  isInErrors = input => {
    if (!this.props.error) return false;
    return (this.props.error.messages || {}).hasOwnProperty(input);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <p />
        <div>
          <TextField
            error={this.isInErrors("title")}
            id="title"
            label="Title"
            margin="normal"
            variant="outlined"
            ref={el => {
              this.title = el;
            }}
            onChange={this.handleChange("title")}
          />
        </div>
        <div>
          <TextField
            error={this.isInErrors("content")}
            id="content"
            label="Content"
            multiline
            rowsMax="10"
            margin="normal"
            variant="outlined"
            ref={el => {
              this.content = el;
            }}
            onChange={this.handleChange("content")}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log(this);
              this.props.onSubmit(this.state);
            }}
          >
            Create
          </Button>
        </div>

        <div>{this.renderErrors()}</div>
      </div>
    );
  }

  renderErrors = () => {
    if (!this.props.error) return null;
    let messages = Object.entries(this.props.error.messages || {});

    return messages.map(([key, list]) => {
      return (
        <div>
          {list.map(l => {
            return (
              <Chip
                label={key + " " + l}
                color="secondary"
                variant="outlined"
              />
            );
          })}
        </div>
      );
    });
  };
}
