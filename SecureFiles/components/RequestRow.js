import React,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/procurement'
import {Route,Link} from '../routes';
class RequestRow extends Component{
  onApprove = async (event) =>{
    console.log("hai");
    event.preventDefault();
          const campaign = Campaign(this.props.address);
         await web3.eth.getAccounts(async (err, accounts) => {
             if(err) throw err;
             try{
               await campaign.methods.approveRequest(this.props.id).send({
                 from:accounts[0]
              });
              Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
            }
            catch(err){
              console.log(err.message);
            }
        });
  }
  onFinalize = async (event) =>{
    console.log("hai");
    event.preventDefault();
          const campaign = Campaign(this.props.address);
         await web3.eth.getAccounts(async (err, accounts) => {
             if(err) throw err;
             try{
               await campaign.methods.finalizeRequest(this.props.id).send({
                 from:accounts[0]
              });
              Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
            }
            catch(err){
              console.log(err.message);
            }
        });
  }
  render(){
    const {Row,Cell} =Table;
    const {id,request,Pmanager,user} =this.props;
    return(
      <Row disabled={request.complete}>
        <Cell>{id+1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.sender}</Cell>
        <Cell>{request.message}</Cell>
        <Cell>
          <Link route={`/requests/${id}`}><Button color="green" basic disabled={!(user==Pmanager)}>
            View
          </Button></Link>
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
