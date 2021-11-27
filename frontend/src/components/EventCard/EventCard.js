import {React, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardBody from "../../components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import eventImg from "../../assets/img/event.jpg";
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Typography from "@material-ui/core/Typography/Typography";
import Popup from "../../components/Popup/Popup";
import BootstrapDialog from "../../components/BootstrapDialog/BootstrapDialog";

toast.configure();
  
const useStyles = makeStyles(styles);

export default function EventCard(props) {
  const classes = useStyles();
  const event = JSON.parse(JSON.stringify(props)).event;
  const user = JSON.parse(localStorage.getItem("user"));
  const chatRoomLink = "https://whispering-atoll-41471.herokuapp.com/chat.html?username=" + user.username + "&room=" + event.course;

  function importAll(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace('./', '')] = r(item) ));
    return images;
  }
  
  const images = importAll(require.context("../../assets/img/events", false, /\.(png|jpe?g|svg)$/));

  const [joined, setJoined] = useState(event.members.includes(user.username))
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function postEvent(URL, username) {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({username: username})
    }).then(res => {
      if(res.status === 200) {
        setJoined(true);
        toast.success("You joined the group " + event.course);
        return res.json();
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function postCoins() {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("/users/coins/" + user.username, {
      method: 'POST',
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({coins: 3})
    }).then(res => {
      if(res.status === 200) {
        toast.success("Yayy!! You earned 3 gems !")
        return res.json();
      }
    }).then(res => {
        console.log(res);
    }).catch(err => {
      console.log(err);
  })
  }

  function onJoinClick() {

    const URL = `/events/member/${event._id}`;
    postEvent(URL, user.username);
    postCoins();    
  }

  function onLeaveClick() {
    const URL = `/events/member/${event._id}`;

    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({username: user.username})
    }).then(res => {
      if(res.status === 200) {
        setJoined(false);
        toast.warning("You left the group " + event.course);
        return res.json();
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <Card className={classes.Card} style={{width: "280px"}}>
        <CardMedia
          component="img"
          alt="image"
          height="140"
          image={images[`event-${Math.floor(Math.random()*6 + 1)}.jpg`].default}
        />
        <CardBody>
          <h4 className={classes.cardTitle}>{event.course}</h4>
          <p className={classes.cardCategory}>{event.subject}</p>
        </CardBody>
        <CardFooter chart>
          <div>
            <Button onClick={handleClickOpen}> VIEW </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
              <Popup id="customized-dialog-title" onClose={handleClose} style={{width: "500px"}}>
                {event.course}
              </Popup>
              <DialogContent dividers>
                <Typography gutterBottom>
                  {event.description}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus target="_blank" href={chatRoomLink} color="primary" variant="outlined">
                  JOIN CHATROOM
                </Button>
              </DialogActions>
            </BootstrapDialog>
            {joined ? <Button onClick={() => onLeaveClick()} color="secondary" >LEAVE</Button> 
            : <Button onClick={() => onJoinClick()}> JOIN </Button>}
              </div>
                <span>@{event.username}</span>
        </CardFooter>
      </Card> 
    </div>
  );
}
