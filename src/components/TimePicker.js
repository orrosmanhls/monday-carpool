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
  officeDepartureStart,
  officeDepartureEnd,
  setOfficeDepartureStart,
  setOfficeDepartureEnd,
  homeDepartureStart,
  homeDepartureEnd,
  setHomeDepartureStart,
  setHomeDepartureEnd,
}) {
  const classes = useStyles();

  return (
    <div className="time-picker-container">
      <p>To The Office</p>
      <div className="pickers-container">
        <TextField
          id="time"
          label="Start Time"
          type="time"
          defaultValue={officeDepartureStart}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setOfficeDepartureStart(event.target.value)}
        />
        <TextField
          id="time"
          label="End Time"
          type="time"
          defaultValue={officeDepartureEnd}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setOfficeDepartureEnd(event.target.value)}
        />
      </div>
      <p>Back Home</p>
      <div className="pickers-container">
        <TextField
          id="time"
          label="Start Time"
          type="time"
          defaultValue={homeDepartureStart}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setHomeDepartureStart(event.target.value)}
        />
        <TextField
          id="time"
          label="End Time"
          type="time"
          defaultValue={homeDepartureEnd}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(event) => setHomeDepartureEnd(event.target.value)}
        />
      </div>
    </div>
  );
}
