import React from "react";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import Laptop from "@material-ui/icons/Laptop";
import Chat from "@material-ui/icons/Chat";
import RedeemIcon from "@material-ui/icons/RedeemOutlined";

import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import carousel1 from "../../assets/img/carousel-7.jpeg"
import carousel3 from "../../assets/img/carousel-6.jpg"; 
import carousel4 from "../../assets/img/carousel-5.png"; 
import dashboard1 from "../../assets/img/dashboard1.png"; 

const style={
  borderRadius: "10px",
  boxShadow: "3px 5px 3px #9E9E9E"
};

export default function Dashboard() {
  // const classes = useStyles();
  return (
    <div>
      <Carousel>
        <img src={carousel1} alt="carousel-1" style={style}/>
        <img src={carousel4} alt="carousel-2" style={style}/>
        <img src={carousel3} alt="carousel-3" style={style}/>
      </Carousel>
      <GridContainer style={{backgroundColor: "#F5F5F5",  borderRadius: "10px", boxShadow: "3px 5px 3px #9E9E9E"}}>
        <GridItem xs={12} sm={12} md={12} style={{margin: "20px"}}>
            <h3>Educating and empowering the community</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={5} style={{margin:"20px", marginTop: "0px"}}>
        <h5>INSPIRATION</h5>
          <p>How can virtual classes be more interactive and how to re-establish 
            the lost human connection for online learning systems? Our targeted 
            theme is Education wherein through the use of technology we are making an
             effort to improve the educational environment.
          </p>

          
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <img src={dashboard1} alt="dashboard-1" style={{ maxWidth: "100%" }} />
        </GridItem>
      </GridContainer>
      <br/><br/> <h3 style={{marginLeft: "45%"}}>Features</h3>
      
      <br/>
      <GridContainer >
        <GridItem xs={12} sm={4} md={4}>
          <div style={{textAlign: "center"}}>
            <Laptop style={{fontSize: "100px"}}/>
            <p>Collaborative Virtual Learning</p>
          </div>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <div style={{textAlign: "center"}}>
            <Chat style={{fontSize: "100px"}}/>
            <p>Real-time chat feature</p>
          </div>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <div style={{textAlign: "center"}}>
            <RedeemIcon style={{fontSize: "100px"}}/>
            <p>Streaks Features - Rewards for users</p>
          </div>
        </GridItem>
      </GridContainer>
      <br/>

    </div>
  );
}
