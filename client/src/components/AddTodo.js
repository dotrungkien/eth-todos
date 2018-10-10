import React from 'react'
import { Button, Input, Grid } from '@material-ui/core'

const AddTodo = ({ handleChange, handleSubmit }) => {
  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Input placeholder="New Todo" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    </Grid>
  )
}

export default AddTodo
