import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Model Definition</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <pre>
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Rest Client</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <pre>
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Connection With <b>React</b>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <pre>
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
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
//
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
