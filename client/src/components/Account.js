import React, { Component } from "react";
import { Grid, List, ListItem, Avatar, ListItemText } from "@material-ui/core";
import { AccountBox, AccountBalanceWallet } from "@material-ui/icons";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      balance: null
    };
  }

  componentDidMount() {
    const { web3 } = this.props;
    const account = web3.eth.coinbase;
    this.setState({ account });
    web3.eth.getBalance(account, (err, result) => {
      const balance = web3.fromWei(result.toNumber());
      if (!err) this.setState({ balance });
    });
  }

  render() {
    return (
      <Grid item xs={12}>
        <List>
          <ListItem>
            <Avatar>
              <AccountBox />
            </Avatar>
            <ListItemText>{this.state.account}</ListItemText>
          </ListItem>
          <ListItem>
            <Avatar>
              <AccountBalanceWallet />
            </Avatar>
            <ListItemText>{this.state.balance} ETH</ListItemText>
          </ListItem>
        </List>
      </Grid>
    );
  }
}

export default Account;
