import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PageviewIcon from "@material-ui/icons/Pageview";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import { setCurrentComponent } from "../../actions/componentActions";
import { connect } from "react-redux";
import FillKra from "../fillkra";
import Myprofile from "../myprofile";
import ViewKra from "../viewkra";
import ViewUsers from "../viewUser";
import { viewUsers } from "../../actions/viewUser";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Chart from "../graph";
import Divider from "@material-ui/core/Divider";

class ManagerFeatures extends Component {
  state = { disabled: false, flag: false };

  componentDidMount() {
    const d = new Date().getDate();
    if (d >= 2 && d <= 30 && this.props.kraStatus) {
      this.setState({ disabled: true });
    }
  }

  check = () => {
    this.setState({ disabled: true });
  };
  render() {
    return (
      <div>
        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<Myprofile />);
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    kraStatus: state.auth.user.userdata.filledKra
  };
};

export default connect(mapStateToProps, { setCurrentComponent, viewUsers })(
  ManagerFeatures
);
