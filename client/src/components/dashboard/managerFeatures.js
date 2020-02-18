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
import ViewMyTeam from "../viewMyTeam";
import LeaveRequests from "../leaveRequests";
import { viewMyTeam } from "../../actions/viewMyTeam";
import KraRequest from "../kraRequest";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Chart from "../graph";
import Applyleave from "../applyLeave";
import { Divider } from "@material-ui/core";
import DeckIcon from "@material-ui/icons/Deck";
import DescriptionIcon from "@material-ui/icons/Description";
class ManagerFeatures extends Component {
  state = { disabled: false, flag: false };

  componentDidMount() {
    this.props.viewMyTeam();
    const d = new Date().getDate();
    if (d >= 2 && d <= 30 && this.props.kraStatus) {
      this.setState({ disabled: true });
    }
  }

  check = () => {
    this.setState({ disabled: true });
  };
  render() {
    const { myteam } = this.props;

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

        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<Chart />);
          }}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Performance" />
        </ListItem>

        <ListItem
          disabled={this.state.disabled}
          button
          onClick={() => {
            this.props.changeComponent(<FillKra check={this.check} />);
          }}
        >
          <ListItemIcon>
            <InsertCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Fill KRA" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<ViewKra />);
          }}
        >
          <ListItemIcon>
            <PageviewIcon />
          </ListItemIcon>
          <ListItemText primary="All KRA" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<ViewMyTeam myusers={myteam} />);
          }}
        >
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>
          <ListItemText primary="My Team" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<KraRequest />);
          }}
        >
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="KRA Request" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<LeaveRequests />);
          }}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Requests" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            this.props.changeComponent(<Applyleave />);
          }}
        >
          <ListItemIcon>
            <DeckIcon />
          </ListItemIcon>
          <ListItemText primary="Apply Leave" />
        </ListItem>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    myteam: state.myteam.myteam,
    kraStatus: state.auth.user.userdata.filledKra
  };
};

export default connect(mapStateToProps, { setCurrentComponent, viewMyTeam })(
  ManagerFeatures
);
