import React from 'react';
import { Grid, List, ListItem, Avatar, ListItemText } from '@material-ui/core';
import { AccountBox, AccountBalanceWallet } from '@material-ui/icons';

const Account = ({ account, balance }) => (
  <Grid item xs={12}>
    <List>
      <ListItem>
        <Avatar>
          <AccountBox />
        </Avatar>
        <ListItemText>{account}</ListItemText>
      </ListItem>
      <ListItem>
        <Avatar>
          <AccountBalanceWallet />
        </Avatar>
        <ListItemText>{balance} ETH</ListItemText>
      </ListItem>
    </List>
  </Grid>
);

export default Account;
