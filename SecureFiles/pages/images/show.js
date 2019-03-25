import React,{Component} from 'react';
import Layout from '../../components/Layout';
import Wallet from '../../ethereum/wallet.js'
import {Card,Grid,Button,Form,Input,Message,Table} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Link,Router} from '../../routes';
import ipfs from '../../ethereum/ipfs'
class ImagesShow extends Component{
  state={
    description:'',
    errorMessage:'',
    errorMessage:'',
    loading:false,
    loading1:false,
    file:'',
    hash:'',
    ipfsLink:'',
  }
  static async getInitialProps(props){
    const address = props.query.address;
    const wallet = await Wallet(address);
    const imagesCount = await wallet.methods.imagesCount().call();
    const name = await wallet.methods.Name().call();
    const manager = await wallet.methods.manager().call();
    var images = Array();
    for(var i=0;i<imagesCount;i++){
      images.push(await wallet.methods.getImage(i).call());
    }
    console.log(imagesCount);
    return {address,images,name,manager,wallet}
  }
  captureFile = (event)=>{

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({file: Buffer(reader.result)});

    }
  }
  onSubmit = async (event) =>{
    event.preventDefault()
    this.setState({loading1:true});
    await ipfs.files.add(this.state.file,async (error,result) =>{
      if(error) throw error;
      else{
        this.setState({hash:result[0].hash,ipfsLink:'http://ipfs.io/ipfs/'+result[0].hash,loading1:false})
        this.upload()
      }
    });

  }
  upload = async ()=>{
        this.setState({loading1:true});
    await web3.eth.getAccounts( async (err,accounts) =>{
      if(err) throw err;
      else{
        try{
          console.log(this.state.ipfsLink);
          console.log(accounts);
          const wallet = await Wallet(this.props.address);
          await wallet.methods.addImage(this.state.hash,this.state.ipfsLink).send({
          from:accounts[0]
          })
          this.setState({loading1:false});
          alert("file uploaded successfully")
          Router.pushRoute(`/images/${this.props.address}`)

        }
        catch(err){
          this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
          this.setState({loading1:false});
        }
      }
    });
  }
  renderImages(){
    const items = this.props.images.map(image=> {
      return {
        header: image[0],
        description: <a href={image[1]} target='_blank'>View</a>,
        fluid:true
      }
    })
    return <Card.Group items={items}/>;
  }
  render(){
    return(
      <Layout>
      <div>
        <h1>welcome {this.props.name}</h1>
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              List of Images
            </Card.Header>
            {this.renderImages()}
          </Card.Content>
          <Card.Content extra>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage1} >
              <input
                onChange={this.captureFile}
                type='file'
              /><br/>
                <br/>
              <Button loading={this.state.loading1} type='submit' content='upload' primary />
              <Message error header="Oops!" content={this.state.errorMessage1}/>
            </Form>
          </Card.Content>
        </Card>
        <img src={`http://ipfs.io/ipfs/${this.state.hash}`} alt=''/>
      </div>
    </Layout>
    );
  }
}
export default ImagesShow;
