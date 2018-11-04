import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
          <Typography className={classes.heading}>
            <p>
              This app demonstrates the usage of{" "}
              <a href={"#"}>ReduxManagerLib</a>. {"\n"}
            </p>
            <p>
              In the example you'll see a UI that supports the <b>basic CRUD</b>{" "}
              operations. In this case a simplistic "BlogPost" model is used.
            </p>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <p>New entries can be created with the form on the bottom.</p>

            <p>
              The app <i>reads</i> all the entries on load.
            </p>

            <p>
              To <i>update</i> an entry or to bulk <i>update</i>, select as many
              of them as you like and open the "edit form", from the controls
              that will appear.
            </p>

            <p>
              Selection one or more entries also allows you to <i>delete</i>{" "}
              them.
            </p>
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
