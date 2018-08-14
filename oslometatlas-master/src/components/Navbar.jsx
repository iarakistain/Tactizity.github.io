import React, { Component } from 'react';
import Countries from "./Countries";
import Projects from "./Projects";
import Home from "./Home";
import FouroFour from "./FouroFour";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import About from './About';

    export default class Navbaren extends React.Component {
      constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      render() {
        return (
<Router>
  <div className="App">
  <div className="menu-container">

  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">
      <img src={require("../styles/static/OsloMet.png")} className="ometLogo" alt="OsloMet Logo"/>
      Global South 
    </NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Projects
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="/projects">All projects</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Uganda
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Africa
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

        <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Countries
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="/countries">All countries</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Uganda
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Africa
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/countries" component={Countries} />
        <Route path="/projects" component={Projects} />
        <Route component={FouroFour} />
      </Switch>
  </div> 
</div>
</Router> 
)
}
}