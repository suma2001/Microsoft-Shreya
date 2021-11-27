import {React, useState, useEffect} from "react";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

import { makeStyles } from "@material-ui/core/styles";
import LetteredAvatar from 'react-lettered-avatar';

import functions from "../../actions/functions";

const {createdEventType, joinedEventType} = functions;

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  
  useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const [events, setEvents] = useState();

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user!==null) {
        fetch('/events',{
          headers:{
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'Authorization' : "Bearer "+ localStorage.getItem("token"),
          }, 
        })
        .then( res => {
          if(res.status === 200) {
            return res.json()
          }})
        .then(result=>{
          setEvents(JSON.parse(JSON.stringify(result)));
          
        }).catch(err => {
          console.log(err);
        })
      }
    }
,[]);

  return (
    <Card>
      <CardHeader color="primary">
        <GridContainer>
          <GridItem xs={1} sm={1} md={1}>
            <LetteredAvatar
          name={user.username}
          size={50}
          radius={10}
          color="purple"
          backgroundColor="white"
          />
          </GridItem>
          <GridItem xs={11} sm={11} md={2}>
          <h4 className={classes.cardTitleWhite} style={{marginTop: "10px"}}>@ {user.username}</h4>
          </GridItem>
        </GridContainer>       
        
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Groups Joined</h5>
            <br />
            {joinedEventType(events, user)}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Groups Created</h5>
            <br />
            {createdEventType(events, user)}
            
          </GridItem>
        </GridContainer>
        <br />
        <br />
        </CardBody>
    </Card>
  );
}
