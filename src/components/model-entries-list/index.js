import React from "react";
import styles from "./model-entries-list.css";

class ModelEntriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newEntryOpen: false,
      editEntity: null
    };
  }

  toggleNewEntryForm = () => {
    this.setState({
      newEntryOpen: !this.state.newEntryOpen
    });
  };

  openEditForm = id => {
    this.setState({
      editEntity: id,
      newEntryOpen: false
    });
  };

  closeEditForm = () => {
    this.setState({
      editEntity: null
    });
  };

  deleteEntry = id => {
    console.log("id", id);
    this.setState(
      {
        ...this.state,
        editEntity: null
      },
      () => {
        this.props.model.delete({ id });
      }
    );
  };

  componentWillMount() {
    this.props.model.read();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.operationStates.update !== this.props.operationStates.update
    ) {
      if (this.props.operationStates.update === "SUCCESS") {
        this.closeEditForm();
      }
    }

    if (
      prevProps.operationStates.create !== this.props.operationStates.create
    ) {
      if (this.props.operationStates.create === "SUCCESS") {
        this.toggleNewEntryForm();
      }
    }
  }

  render() {
    console.log("page render");
    return (
      <div className={"entity-page"}>
        <h2>{this.props.modelName}</h2>
        {this.props.all.length > 0
          ? this.renderTable()
          : this.renderNoResults()}
        {this.renderNewEntryForm()}
        {this.state.editEntity && this.renderEditForm()}
        {this.renderError()}
        {this.props.children}
      </div>
    );
  }

  renderTable = () => {
    return (
      <table>
        <th>id</th>
        <th>title</th>
        <th>content</th>
        <th />
        <th />
        {this.props.all.map((entity, i) => {
          return (
            <tr key={entity.id} className={"entity-row"}>
              <td>{entity.id}</td> <td>{entity.title}</td>{" "}
              <td>{entity.content}</td>{" "}
              <td onClick={() => this.openEditForm(entity.id)}>
                <button className="edit-entity">EDIT</button>
              </td>
              <td onClick={() => this.deleteEntry(entity.id)}>
                <button className="delete-entity">DELETE</button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  };

  renderNoResults = () => {
    return <div>No results found for {this.props.modelName}</div>;
  };

  renderNewEntryForm = () => {
    console.log("e form");
    return (
      <div className={"new-entity-form-wrapper"}>
        {this.state.newEntryOpen && (
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.model.create({
                title: this.title.value,
                content: this.content.value
              });
            }}
            className={"new-entity-form"}
          >
            <p>Create a new entity</p>
            <input
              type="text"
              name="title"
              placeholder="title"
              ref={el => {
                this.title = el;
              }}
              className={this.isInErrorMessages("title") ? "has-error" : ""}
            />
            <textarea
              name="content"
              placeholder="content"
              ref={el => {
                this.content = el;
              }}
              className={this.isInErrorMessages("content") ? "has-error" : ""}
            />

            <input type="submit" value="Create" />
          </form>
        )}

        <button className={"toggle-button"} onClick={this.toggleNewEntryForm}>
          {this.state.newEntryOpen ? "Close" : "New Entity"}
        </button>
      </div>
    );
  };

  renderEditForm = () => {
    let entityId = this.state.editEntity;
    let entity = this.props.all.find(function(ent) {
      return ent.id === entityId;
    });

    return (
      <div className={"new-entity-form-wrapper"} key={entityId}>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.model.update({
              title: this.title.value,
              content: this.content.value,
              id: entityId
            });
          }}
          className={"new-entity-form"}
        >
          <p>Edit entity</p>
          <input
            type="text"
            name="title"
            placeholder="title"
            ref={el => {
              this.title = el;
            }}
            defaultValue={entity.title}
            className={this.isInErrorMessages("title") ? "has-error" : ""}
          />
          <textarea
            name="content"
            placeholder="content"
            ref={el => {
              this.content = el;
            }}
            defaultValue={entity.content}
            className={this.isInErrorMessages("content") ? "has-error" : ""}
          />

          <input type="submit" value="EDIT" />
        </form>

        <button className={"toggle-button"} onClick={this.closeEditForm}>
          Cancel
        </button>
      </div>
    );
  };

  isInErrorMessages = inputName => {
    try {
      return this.props.error.messages.hasOwnProperty(inputName);
    } catch (e) {
      return false;
    }
  };

  renderError = () => {
    if (this.props.error) {
      let messages;
      try {
        console.log("parsing messages");
        messages = Object.entries(this.props.error.messages).map(
          ([key, value], index) => {
            return (
              <div>
                <span>{key}</span> <span>{value}</span>
              </div>
            );
          }
        );
      } catch (e) {
        messages = null;
      }
      return <div className={"error-messages-wrapper"}>{messages}</div>;
    }
  };
}

export default ModelEntriesList;
