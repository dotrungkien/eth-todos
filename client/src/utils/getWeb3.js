import Web3 from 'web3'

const getWeb3 = new Promise(resolve => {
  window.addEventListener('load', () => {
    var web3 = window.web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      console.log('Injected web3 detected.')
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
      console.log('No web3 instance injected, using local web3')
    }
    resolve({ web3 })
  })
})

export default getWeb3
