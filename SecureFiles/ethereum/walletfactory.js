import web3 from './web3';
const WalletFactory = require('./build/WalletFactory.json');
console.log(web3.version);
const instance = new web3.eth.Contract(
  JSON.parse(WalletFactory.interface),
'0x87263a546534748805961677BAEbcbEE333180c3'
);
export default instance;

//'0x6F286Bfe55E62180840719f47Ff55378109c46e5'
