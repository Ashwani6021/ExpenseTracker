import React, { useEffect, useContext } from "react";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import { ExpenseTrackerContext } from "./context/context";

const App = () => {
  const { getTransaction } = useContext(ExpenseTrackerContext);
  useEffect(() => {
    getTransaction();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={3}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
