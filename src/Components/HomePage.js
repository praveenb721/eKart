import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class HomePage extends React.Component {
    
    logout = () =>{
      sessionStorage.clear();
    }
    render(){
        return (
            <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">

              <Nav >
                <NavLink to='/' style={{marginRight:"16px"}} onClick={this.logout}>
                  <h4>Logout </h4>
                </NavLink>
              </Nav>


              <Nav>
                <NavLink to='/modifyAccount' activeStyle={{color:"green"}} style={{marginRight:"16px"}}>
                  <h4>Account </h4>
                </NavLink>
              </Nav>

              <Nav>
                <NavLink to='/addCard' activeStyle={{color:"green"}} style={{marginRight:"16px"}}>
                  <h4>Add Card </h4>
                </NavLink>
              </Nav>

              <Nav>
                <NavLink to='/viewCards' activeStyle={{color:"green"}} style={{marginRight:"16px"}}>
                  <h4>View Cards </h4>
                </NavLink>
              </Nav>

            </Nav>
          </Navbar>
        )
    }
}

export default HomePage;