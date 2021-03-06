import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Grid from './Grid';

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper'
  }
});

class calendarGrid extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    let today = new Date();
    today = today.getDay(); // 0 = Sunday, 6 = Saturday

    if (today > 0 && today < 6) {
      today -= 1;
      this.setState({ value: today });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    let tabContent = null;
    if (this.props.data) {
      tabContent = (
        <TabContainer>
          <Grid data={this.props.data[value]} />
        </TabContainer>
      );
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}>
            <Tab label="Monday" />
            <Tab label="Tuesday" />
            <Tab label="Wednesday" />
            <Tab label="Thursday" />
            <Tab label="Friday" />
          </Tabs>
        </AppBar>
        {tabContent}
      </div>
    );
  }
}

calendarGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(calendarGrid);
