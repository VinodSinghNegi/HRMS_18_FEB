import "date-fns";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Header } from "semantic-ui-react";
import Moment from "react-moment";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Button, Divider } from "@material-ui/core";
import {
  getLeaveSeeds,
  applyLeave,
  getLeave,
  deleteLeave
} from "../actions/leaveaction";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import Select from "react-dropdown-select";
import { MDBContainer, MDBBtn } from "mdbreact";

const columns = [
  { id: "From", label: "From", minWidth: 100 },
  {
    id: "To",
    label: "To",
    minWidth: 170,
    align: "center"
  },
  {
    id: "Leave Type",
    label: "Leave Type",
    minWidth: 170,
    align: "center"
  },

  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "center"
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 170,
    align: "center"
  }
];
const style = {
  h1: {
    fontFamily: "Times New Roman",
    fontWeight: "bolder"
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em"
  }
};
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: "auto"
  }
});

const ApplyLeave = ({
  getLeaveSeeds,
  leaveState: { leaves, seeds },
  applyLeave,
  getLeave,
  deleteLeave,
  responsemsg
}) => {
  const [formdata, setformdata] = React.useState({
    fromDate: new Date(),
    toDate: new Date(),
    leaveData: null,
    reason: "personal"
  });

  const { fromDate, toDate, leaveData, reason } = formdata;
  useEffect(() => {
    getLeaveSeeds();
    getLeave();
  }, [getLeaveSeeds, getLeave]);

  const handleDateChangeFrom = date => {
    if (date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) {
      setformdata({ ...formdata, fromDate: date, toDate: date });
    } else {
      window.alert("You cannot select past date");
    }
  };
  const handleDateChangeTo = date => {
    if (
      date.setHours(0, 0, 0, 0) >= toDate.setHours(0, 0, 0, 0) &&
      date.setHours(0, 0, 0, 0) >= fromDate.setHours(0, 0, 0, 0)
    ) {
      setformdata({ ...formdata, toDate: date });
    } else {
      window.alert("You cannot select past2 date");
    }
  };

  const onSubmit = async () => {
    applyLeave(formdata);
  };

  const classes = useStyles();

  return (
    <MDBContainer>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Header
            as="h5"
            content="Apply New Leave"
            style={style.h1}
            textAlign="center"
          />
        </div>
        <br />
        <div style={{ width: "250px", margin: "0 auto" }}>
          Leave Type
          <StyledSelect
            multi={false}
            color="orange"
            searchBy="name"
            searchable={false}
            dropdownHandle={true}
            dropdownHeight="300px"
            direction="ltr"
            values={seeds[0] && [seeds[0]]}
            labelField="name"
            valueField="name"
            options={seeds}
            onChange={value => {
              setformdata({
                ...formdata,
                leaveData: value[0] && value[0]._id
              });
            }}
            noDataLabel="No matches found"
          />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{ width: "250px", margin: "0 auto" }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="From"
              name="From"
              format="dd/MM/yyyy"
              value={fromDate}
              onChange={handleDateChangeFrom}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </div>
          <br />

          <div style={{ width: "250px", margin: "0 auto" }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="To"
              name="To"
              format="dd/MM/yyyy"
              value={toDate}
              onChange={handleDateChangeTo}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </div>
          <br />
          <div style={{ width: "250px", margin: "0 auto" }}>
            Reason
            <br />
            <input
              style={{ width: "250px", height: "40px", margin: "0 auto" }}
              name="reason"
              value={reason}
              onChange={e => {
                setformdata({ ...formdata, reason: e.target.value });
              }}
            ></input>
            <br />
            <br />
            <MDBBtn size="md" onClick={onSubmit}>
              Apply
            </MDBBtn>
            <br />
            {responsemsg}
          </div>
        </MuiPickersUtilsProvider>
        <br />
        <br />
      </Paper>
      <br />
      <br />
      <Divider />
      <br />
      <br />

      {/* aplied leaves section below */}

      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Header
            as="h5"
            content="Applied Leaves"
            style={style.h1}
            textAlign="center"
          />
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((user, i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Moment format="DD/MM/YYYY">{user.fromDate}</Moment>
                  </TableCell>
                  <TableCell align="center">
                    <Moment format="DD/MM/YYYY">{user.toDate}</Moment>
                  </TableCell>
                  <TableCell align="center">
                    {user.leaveData && user.leaveData.name}
                  </TableCell>
                  <TableCell align="center">{user.Status}</TableCell>
                  <TableCell align="center">
                    <MDBBtn
                      size="md"
                      disabled={user.Status !== "Not Approved"}
                      onClick={() => {
                        deleteLeave(user._id);
                      }}
                    >
                      Delete
                    </MDBBtn>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </MDBContainer>
  );
};
const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `.react-dropdown-select-dropdown {
overflow: initial;
}`}
`;
const mapStateToProps = state => ({
  leaveState: state.leaves,
  responsemsg: state.errors.msg
});
export default connect(mapStateToProps, {
  getLeaveSeeds,
  applyLeave,
  getLeave,
  deleteLeave
})(ApplyLeave);
