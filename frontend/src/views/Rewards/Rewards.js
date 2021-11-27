import {React, useState, useEffect} from "react";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';
import ReactCardFlip from 'react-card-flip';

import trophy from "../../assets/img/trophy.gif";
import star from "../../assets/img/star.gif";

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
  cardBodyText: {
    fontSize: "30px",
    fontWeight: "400",
    color: "magenta",
    marginLeft: "20%"
  }

};


const useStyles = makeStyles(styles);

export default function Rewards() {
  const classes = useStyles();
  const [isFlipped, setFlipped] = useState(false);
  const [coins, setCoins] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { width, height } = useWindowSize();

  useEffect( () => {
    
    fetch(`/users/coins/${user.username}`,{
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
        setCoins(result.coins);
        
      }).catch(err => {
        console.log(err);
      })
  })

  const handleClick = (e) => {
    e.preventDefault();
    setFlipped(!isFlipped );
  }

  return (
      <div>
        <ReactCardFlip isFlipped={isFlipped}>
        <GridContainer>
      <GridItem xs={8} sm={6} md={6}>
        <Card style={{marginLeft: "50%"}}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}><i>Congratulations {user.username} !!</i></h4>
          </CardHeader>
          <CardBody>
          <img src={trophy} alt= "trophy" style={{maxWidth: "100%", alignItems: "center"}}/>
          </CardBody>
          <br/>
          <CardFooter>
              <Button onClick={handleClick} style={{marginLeft: "39%"}} variant="outlined" color="secondary">VIEW GEMS</Button>
          </CardFooter>
          <br/>
        </Card>
      </GridItem>
      </GridContainer>
        <GridContainer>
      <GridItem xs={8} sm={6} md={6}>
        <Confetti
          width={width}
          height={height}
        />
        <Card style={{marginLeft: "50%"}}>
        <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}><i>Congratulations {user.username} !!</i></h4>
          </CardHeader>
          <CardBody>
            <img src={star} alt="star" style={{maxWidth: "100%"}} />
            <p className={classes.cardBodyText}> 
              <i>You gained {coins} gems !!  </i>
            </p>
          </CardBody>
          <CardFooter>
          <Button onClick={handleClick} style={{marginLeft: "45%"}} variant="outlined" color="secondary">FLIP </Button>
          </CardFooter>
          <br/>
        </Card>
      </GridItem>
      </GridContainer>
      </ReactCardFlip>
      </div>
      
    
  );
}
