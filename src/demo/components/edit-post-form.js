import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import RichText from "./rich-text";
import { Value } from "slate";
import { initialValue, initialEmptyValue } from "./serializers";
import { html } from "./serializers";
import Plain from "slate-plain-serializer";
const initialEditorValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [{ object: "text", leaves: [{ text: "" }] }]
      }
    ]
  }
};
export default class EditBlogPostForm extends React.Component {
  state = {
    title: "",
    content: Value.fromJS(initialEditorValue)
  };

  setStateToFirstEntry = () => {
    if (this.props.entries.length === 1) {
      this.setState({
        title: this.props.entries[0].title,
        content: Value.fromJSON(JSON.parse(this.props.entries[0].content))
      });
    }
  };

  resetState = () => {
    this.setState({
      title: "",
      content: Value.fromJSON(initialEditorValue)
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

  ///////////////////////
  // ____Rich Text______
  ///////////////////////
  onContentChange = ({ value }) => {
    this.setState({ content: value });
  };

  // ==== Rich Text ====
  ///////////////////////

  ///////////////////////
  // ___Title Field_____
  ///////////////////////
  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  // === Title Field ====
  ///////////////////////

  create = () => {
    let payload = {
      content: JSON.stringify(this.state.content.toJSON()),
      title: this.state.title
    };
    this.props.onSubmit(payload);
  };
  render() {
    return (
      <div className="new-post-form-wrapper">
        <div className={"new-post-title-wrapper"}>
          <TextField
            className={"new-post-title"}
            placeholder={"Post Title"}
            onChange={this.onTitleChange}
            value={this.state.title}
          />
        </div>
        <Paper>
          <RichText
            onChange={this.onContentChange}
            onKeyDown={this.onContentKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            value={this.state.content}
          />
          <div className={"create-button-wrapper"}>
            <Button variant="contained" color="primary" onClick={this.create}>
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
        </Paper>
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

  isInErrors = input => {
    if (!this.props.error) return false;
    return (this.props.error.messages || {}).hasOwnProperty(input);
  };
}
