import React, { Component } from "react";
import { googStock as googData } from "./data/googStock";
import ChartHighstock from "./ChartHighstock";
import Paper from "@material-ui/core/Paper";
import { Header } from "semantic-ui-react";
import { graph } from "../actions/viewkra";
import { connect } from "react-redux";
class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: googData
    };
  }
  componentDidMount = () => {
    this.props.graph(this.props.selfId);
  };
  render() {
    let content = (
      <ChartHighstock data={this.props.graphKra} title={this.state.title} />
    );

    if (this.props.graphKra.length > 0) {
      return (
        <Paper style={{ width: "80%" }}>
          <Header as="h1" content="Performance Graph" textAlign="center" />
          <div className="Graph">
            <div className="container">{content}</div>
          </div>
        </Paper>
      );
    } else {
      return <div>No data to show , please fill your KRA first.</div>;
    }
  }
}
const mapStateToProps = state => {
  return {
    graphKra: state.addKra.graphdata,
    selfId: state.auth.user.userdata._id
    // userName: state.HRfields
  };
};
export default connect(mapStateToProps, { graph })(Graph);
