import React from 'react';
import Header from '../components/Header';
import Head from 'next/head'
import {Container} from 'semantic-ui-react';
export default (props) =>{
  return (
    <Container>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
        </Head>
        <br/>
        <h1>File Storage</h1>
        {props.children}
    </Container>
  );
};
