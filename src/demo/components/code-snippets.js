import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

class Page1 extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <Paper>
        <pre className={"no-margin"}>
          <code className={"language-js"}>
            {`
import {
  actionTypesFactory,
  actionCreatorsFactory,
  reducerFactory,
  selectorsFactory,
  bindSelectorsToState
} from "redux-manager-lib";
import moduleRestApi from "./rest-client-blog-post";

const MODEL_NAME = "BlogPost";

const actionTypes = actionTypesFactory(MODEL_NAME);

const restApi = moduleRestApi;

const actionCreators = actionCreatorsFactory(actionTypes, restApi);

const reducer = reducerFactory(actionTypes);

const selectors = bindSelectorsToState("blog", selectorsFactory());

const ModelBlogPost = {
  actionTypes,
  restApi,
  actionCreators,
  reducer,
  selectors,
  MODEL_NAME
};
console.log(ModelBlogPost);

export default ModelBlogPost;

                  `}
          </code>
        </pre>
      </Paper>
    );
  }
}

class Page2 extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <pre className={"no-margin"}>
        <code className={"language-js"}>
          {`
import superagent from "superagent";
import { normalize, schema } from "normalizr";

import { pathOr } from "ramda";

const ROOT = "http://localhost:4000/api";

const post = new schema.Entity(
  "post",
  {},
  {
    // Optional. Just to show where data transformation
    // can be done
    processStrategy: (entity, parent, key) => {
      return {
        title: entity.title,
        content: entity.content,
        id: entity.id
      };
    }
  }
);
const arrayOfPosts = [post];

export default {
  create(payload) {
    return superagent
      .post(ROOT + "/Posts")
      .send(payload)
      .then(response => {
        return shape(response);
      })
      .catch(function(response) {
        let adaptedError = adaptErrorForReact(response);
        return Promise.reject(adaptedError);
      });
    function shape(response) {
      const normalizedData = normalize(response.body, post);
      return { byId: normalizedData.entities.post };
    }
  },
  read() {
    return superagent.get(ROOT + "/Posts").then(response => {
      return shape(response);
    });
    function shape(response) {
      const normalizedData = normalize(response.body, arrayOfPosts);
      return {
        byId: normalizedData.entities.post
      };
    }
  },
  update(entry) {
    if (Array.isArray(entry)) {
      return Promise.all(
        entry.map(ent => {
          return superagent.put(ROOT + "/Posts").send(ent);
        })
      )
        .then(responses => {
          let byId = responses.reduce((acc, resp) => {
            const normalizedData = normalize(resp.body, post);
            return {
              ...acc,
              ...normalizedData.entities.post
            };
          }, {});

          return {
            byId
          };
        })
        .catch(error => {
          return Promise.reject(adaptErrorForReact(error));
        });
    }

    return superagent
      .put(ROOT + "/Posts")
      .send({ title, content, id })
      .then(response => {
        return shape(response);

        function shape(response) {
          const normalizedData = normalize(response.body, post);
          return { byId: normalizedData.entities.post };
        }
      })
      .catch(error => {
        return Promise.reject(adaptErrorForReact(error));
      });
  },

  delete(ids) {
    if (Array.isArray(ids)) {
      return Promise.all(
        ids.map(id => {
          return superagent.del(ROOT + \`/Posts/\${id}\`);
        })
      ).then((...responses) => {
        return {
          ids: ids
        };
      });
    }

    return superagent.del(ROOT + \`/Posts/\${id}\`).then(() => {
      let id = ids;
      return id;
    });
  }
};

function adaptErrorForReact(error) {
  if (
    pathOr("", ["response", "body", "error", "name"], error) ===
    "ValidationError"
  ) {
    let messages = pathOr(
      "",
      ["response", "body", "error", "details", "messages"],
      error
    );
    return {
      error: error,
      messages
    };
  }
  return error;
}


                  `}
        </code>
      </pre>
    );
  }
}

class Page3 extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <pre className={"no-margin"}>
        <code className={"language-js"}>
          {`
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BlogPostModel from "./model-blog-post/model-blog-post";

class ModelPage extends React.Component {
  {/* ... */}

  componentWillMount() {
    this.props.readPosts();
  }
  {/* ... */}
}

export default connect(
  function mapStateToProps(state) {
    return {
      allPosts: BlogPostModel.selectors.getAll(state),
      postsError: BlogPostModel.selectors.getError(state),
      deleteState: BlogPostModel.selectors.getOperationStates(state).delete
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        readPosts: BlogPostModel.actionCreators.read,
        createPost: BlogPostModel.actionCreators.create,
        updatePosts: BlogPostModel.actionCreators.update,
        deletePosts: BlogPostModel.actionCreators.delete
      },
      dispatch
    );
  }
)(ModelPage);

                  `}
        </code>
      </pre>
    );
  }
}

class CodeSnippets extends React.Component {
  state = {
    open: 0
  };

  handleChange = open => {
    this.setState({ open });
  };

  render() {
    let { open } = this.state;

    return (
      <div className={"code-section-wrapper"}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Code</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={"code-section-internal-wrapper"}>
              <div className={"code-section-menu-wrapper"}>
                <Divider />

                <List>
                  <ListItem
                    button
                    selected={open === 0}
                    key={"Model Definition"}
                    onClick={() => this.handleChange(0)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Model Definition"} />
                  </ListItem>

                  <ListItem
                    selected={open === 1}
                    button
                    key={"Rest Client"}
                    onClick={() => this.handleChange(1)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Rest Client"} />
                  </ListItem>

                  <ListItem
                    selected={open === 2}
                    button
                    key={`With React`}
                    onClick={() => this.handleChange(2)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={`With React`} />
                  </ListItem>
                </List>
                <Divider />
              </div>

              <div className={"code-section-code-wrapper"}>
                {open === 0 && <Page1 />}
                {open === 1 && <Page2 />}
                {open === 2 && <Page3 />}
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default CodeSnippets;
