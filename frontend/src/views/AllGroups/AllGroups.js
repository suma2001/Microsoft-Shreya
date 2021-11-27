import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import {React, useState, useEffect} from "react";
import EventCard from '../../components/EventCard/EventCard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from "@material-ui/core";

toast.configure();

export default function AllGroups() {

    const [events, setEvents] = useState();
    const [loading,setLoading]=useState(true);

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
          setLoading(false);
          
        }).catch(err => {
          console.log(err);
        })
      }
    }
,[]);
  return (
    <div>
        {loading ? <div> <CircularProgress size={14}/>Loading ...</div>
         : events==null ? (<p>Loading ... </p>)
         : (<GridContainer cols={3}>
              {events.map( (event) => (
                <GridItem key={event._id}>
                  <EventCard key={event._id} event={event} />
                </GridItem>
                
          ))}
         </GridContainer>)
        }
    </div>
  );
}


