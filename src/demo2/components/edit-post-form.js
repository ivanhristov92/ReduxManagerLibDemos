import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

export default class EditBlogPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  setStateToFirstEntry = () => {
    if (this.props.entries.length === 1) {
      this.setState({
        title: this.props.entries[0].title,
        content: this.props.entries[0].content
      });
    }
  };

  resetState = () => {
    this.setState({
      title: "",
      content: ""
    });
  };

  componentDidMount() {
    this.setStateToFirstEntry();
  }

  componentDidUpdate(prevProps) {
    if (this.props.entries.length === 1 && prevProps.entries.length !== 1) {
      this.setStateToFirstEntry();
    } else if (
      this.props.entries.length !== 1 &&
      prevProps.entries.length === 1
    ) {
      this.resetState();
    }
  }

  handleChange = name => {
    return e => {
      this.setState({
        [name]: e.target.value
      });
    };
  };

  isInErrors = input => {
    if (!this.props.error) return false;
    return this.props.error.messages.hasOwnProperty(input);
  };

  render() {
    console.log(this.props.entries);
    return (
      <div style={{ textAlign: "center" }}>
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
            value={this.state.title}
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
            value={this.state.content}
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
            Edit
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={this.props.onCancelEdit}
          >
            Cancel
          </Button>
        </div>

        <div>{this.renderErrors()}</div>
      </div>
    );
  }

  renderErrors = () => {
    if (!this.props.error) return null;
    let messages = Object.entries(this.props.error.messages);

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
