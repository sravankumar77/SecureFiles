import React,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/procurement'
import {Route,Link} from '../routes';
class RequestRow extends Component{
  render(){
    const {Row,Cell} =Table;
    const {id,request} =this.props;
    return(
      <Row disabled={request.complete}>
        <Cell>{id+1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.message}</Cell>
      </Row>
    );
  }
}
export default RequestRow;
