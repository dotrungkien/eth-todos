import React from "react";
import { Button, Input, Grid } from "@material-ui/core";

const AddTodo = props => {
  return (
    <Grid item xs={12}>
      <form onSubmit={props.handleSubmit}>
        <Input placeholder="New Todo" onChange={props.handleChange} />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    </Grid>
  );
};

export default AddTodo;
