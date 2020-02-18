import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Highcharts from "highcharts/highstock";

class ChartHighstock extends Component {
  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    let formatData = [];
    formatData = this.props.data
      .map(obj => {
        // const date = obj['Date'].split("/");
        const dateInSeconds = new Date(obj["Date"]).getTime();
        return [dateInSeconds, obj["Close"]];
      })
      .reverse();

    Highcharts.stockChart("chart", {
      series: [
        {
          name: "Average",
          data: formatData
        }
      ]
    });
  }

  render() {
    return <div id="chart"></div>;
  }
}

ChartHighstock.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};

export default ChartHighstock;
