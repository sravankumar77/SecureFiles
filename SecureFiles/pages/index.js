import React,{ Component } from 'react';
import walletfactory from '../ethereum/walletfactory';
import {Card,Button,Form,Input ,Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';
import {Link,Router} from '../routes'
class WalletIndex extends Component{
  state={
    name:'',
    email:'',
    errorMessage:'',
    errorMessage1:'',
    loading:false,
    loading1:false,
  }
  static async getInitialProps(){
      return {};
  }
  onSubmit = async (event) =>{
      event.preventDefault();
      this.setState({loading:true});
      const accounts = await web3.eth.getAccounts( async (err,accounts) =>{
        if(err) throw err;
        else{
          try{
            await walletfactory.methods.createWallet(this.state.name,this.state.email).send({
              from:accounts[0]
            });
            alert("Wallet created successfully")
            this.setState({loading:false});
          }
          catch(err){
            this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
            this.setState({loading:false});
          }
        }
      });
  }
  onSubmit1 = async (event) =>{
      event.preventDefault();
      this.setState({loading1:true});
      const accounts = await web3.eth.getAccounts( async (err,accounts) =>{
        if(err) throw err;
        else{
          try{
          const address =  await walletfactory.methods.getWallet().call({
              from:accounts[0]
            })
            Router.pushRoute(`/images/${address}`)
            this.setState({loading1:false});
          }
          catch(err){
            this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
            this.setState({loading1:false});
          }
        }
      });
  }
  render(){
    return (
    <Layout>
    <Card>
      <Card.Content>
        <Card.Header>
          Create a Wallet
        </Card.Header>
        <Card.Description>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
            <Form.Field>
              <label>Name</label>
              <Input value={this.state.description}
                onChange={event=>this.setState({name:event.target.value})}
                placeholder='Enter. . .'
              />
            </Form.Field>
            <Form.Field>
              <label>email</label>
              <Input value={this.state.description} type='email'
                onChange={event=>this.setState({email:event.target.value})}
                placeholder='Enter. . .'
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage}/>
            <Button loading={this.state.loading} type='submit' content='Create' primary />
          </Form>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Form onSubmit={this.onSubmit1} error={!!this.state.errorMessage1} >
          <Button loading={this.state.loading1} type='submit' content='Login' primary />
          <Message error header="Oops!" content={this.state.errorMessage1}/>
        </Form>
      </Card.Content>
    </Card>
    </Layout>
  );
  }
}
export default WalletIndex;
