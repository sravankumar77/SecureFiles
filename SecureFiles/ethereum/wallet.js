import web3 from './web3';
const Wallet = require('./build/Wallet.json');
export default (address) => {
  const instance = new web3.eth.Contract(
    JSON.parse(Wallet.interface),
    address
  );
  return instance;
}
//'0x6F286Bfe55E62180840719f47Ff55378109c46e5'
