import React from "react";
import PropTypes from "prop-types";
import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ExitToApp from '@material-ui/icons/ExitToApp'

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "left"
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" align="center">
        <Toolbar>
          <Typography className={classes.root} variant="title" color="inherit">
            Welcome to SET - the Codaisseur Student Evaluation Tool
          </Typography>
          <Button href="/batches" color="inherit">
            <HomeIcon />
          </Button>
          <Button href="/logout" color="inherit">
            <ExitToApp />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);