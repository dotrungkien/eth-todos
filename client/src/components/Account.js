import React, { Component } from "react";

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
      <div>
        <div>
          Account:
          <strong>
            <span>{this.state.account}</span>
          </strong>
        </div>
        <div>
          Balance:
          <strong>
            <span>{this.state.balance} ETH</span>
          </strong>
        </div>
      </div>
    );
  }
}

export default Account;
