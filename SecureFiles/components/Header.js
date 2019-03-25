import React from 'react';
import {Menu} from 'semantic-ui-react';
import{Link} from '../routes' ;
export default () =>{
  return (
      <Menu style={{marginTop:'50px'}}>
        <Link route="/">
          <a className="item">
            Procurement
          </a>
        </Link>
        <Menu.Menu position='right'>
            <Menu.Item content = 'Requests'/>
            <Link route="/requests/new">
              <a className="item">
                +
              </a>
            </Link>
        </Menu.Menu>

      </Menu>
  );
};
