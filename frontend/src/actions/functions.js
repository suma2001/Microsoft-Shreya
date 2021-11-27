import React from 'react';
import { CircularProgress } from "@material-ui/core";
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const postEvent = (body) => {
    fetch('/events', {
      method: 'POST',
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify(body)
    }).then(res => {
      
      if(res.status === 200) {
        return res.json();
      }
    }).then(() => {
      toast.success('Group created !', {autoClose: 3000});
      postCoins(5);
      // window.location.href = "/admin/dashboard";
    }).catch(err => {
      toast.error('Error creating group !', {autoClose: 3000});
      console.log(err);
    });
}

const postCoins = (coin) => {
  const user = JSON.parse(localStorage.getItem("user"));
  fetch("/users/coins/" + user.username, {
    method: 'POST',
    headers: {
      'Accept': 'application/json , text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({coins: coin})
  }).then(res => {
    if(res.status === 200) {
      toast.success("Yayy!! You earned 5 gems !")
      // window.location.href = "/admin/allgroups";
      return res.json();
    }
  }).catch(err => {
    console.log(err);
}) 
}

const createdEventType = (events, user) => {
  if(events!=null) {
    const createdEvents = events.filter(event => event.username === user.username);
    const space = " - ";
    if (createdEvents.length !== 0) {
        return (
          createdEvents.map(event => (
                <SnackbarContent key={event._id} message={event.subject + space + event.course} dele="true" id={event._id}/>
            ))
        )
    } else {
        return <SnackbarContent message="No events" dele="false"/>
    }
  } else {
    return <div> <CircularProgress size={14} /> Loading ... </div>
  }
}

const joinedEventType = (events, user) => {
  if(events!=null) {
    const joinedEvents = events.filter(event => event.members.includes(user.username));
    const space = " - ";
    if (joinedEvents.length !== 0) {
        return (
          joinedEvents.map(event => (
                <SnackbarContent key={event._id} message={event.subject + space + event.course} dele="false" />
            ))
        )
    } else {
        return <SnackbarContent message="No events" dele="false"/>
    }
  } else {
    return <div> <CircularProgress size={14} /> Loading ...</div>
  }
}

const postUser = (username, password, weaknesses) => {
  if(password.length < 4) {
    toast.error('Password too short. Minlength  4.', {autoClose: 3000})
  } else {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password, weaknesses: weaknesses})
      }).then(function(response) {
        if (response.status === 200){
          return response.json();        
        }
      }).then(function() {
        window.location.href = "/login";
        toast.success('Signed up successfully !', {autoClose: 3000});
            
      }).catch(err => {
        toast.error(err, {autoClose: 3000});
      });
  }
  
}

const postUserLogin = (username, password) => {
  console.log("HI " + username + password);
  if(username==="" || password==="") {
    toast.error("Fields empty !");
  }
  else{
    fetch('/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: username, password: password})
        }).then(function(response) {
          if (response.status === 200){
            return response.json();
          }
          else {
            toast.error('Invalid credentials !', {autoClose: 3000});
          }
        }).then(function(response) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          window.location.href = "/admin/dashboard";
          toast.success('Logged in successfully !', {autoClose: 3000});
          
        }).catch(err => {
          toast.error(err, {autoClose: 3000});
        });
  }
}

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
}

const functions = {postEvent, postCoins, createdEventType, joinedEventType, postUser, postUserLogin, logout}; 
export default functions;