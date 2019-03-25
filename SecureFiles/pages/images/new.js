import React,{Component} from 'react';
import Layout from '../../components/Layout';
import procurement from '../../ethereum/procurement';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Router,Link} from '../../routes';
class CreateCampaign extends Component{
  state={
    description:'',
    errorMessage:'',
    loading:false
  }
  onSubmit=async (event)=>{
    event.preventDefault();
    this.setState({loading:true});
         await web3.eth.getAccounts(async (err, accounts) => {
            console.log(accounts);
             if(err) throw err;
             try{
               await procurement.methods.makeNewRequest(this.state.description).send({
                 from:accounts[0]
              });
              Router.pushRoute('/');
            }
            catch(err){
              this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
                    this.setState({loading:false});
            }
        });
  }

  render(){
    return (
      <Layout>
        <h1>Create a New Request</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Form.Field>
            <label>Description</label>
            <Input value={this.state.description}
              onChange={event=>this.setState({description:event.target.value})}
              placeholder='Enter. . .'
            />
          </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage}/>
        <Button loading={this.state.loading} type='submit' content='Create' primary />
        </Form>
      </Layout>
    );
  }
};
export default CreateCampaign;
