import React from "react";

import Logout from "@material-ui/icons/PowerSettingsNew";
import Button from "../../components/CustomButtons/Button.js";
import {Navbar, Nav} from 'react-bootstrap';

import functions from "../../actions/functions";
const {logout} = functions;

export default function AdminNavbarLinks() {

  return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <div >
                <Button onClick={logout} color="danger" style={{marginLeft: "40px", marginTop: "20px"}}><Logout/>LOGOUT</Button>
              </div>
            </Nav.Link>     
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}
