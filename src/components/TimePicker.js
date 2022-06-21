import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "../styles/TimePicker.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TimePickers({
  departureStart,
  departureEnd,
  setDepartureStart,
  setDepartureEnd,
}) {
  const classes = useStyles();

  return (
    <div className="time-picker-container">
      <p>Departure Time Range</p>
      <div className="pickers-container">
        <TextField
          id="time"
          label="Start Time"
          type="time"
          defaultValue={departureStart}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setDepartureStart(event.target.value)}
        />
        <TextField
          id="time"
          label="End Time"
          type="time"
          defaultValue={departureEnd}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setDepartureEnd(event.target.value)}
        />
      </div>
    </div>
  );
}
