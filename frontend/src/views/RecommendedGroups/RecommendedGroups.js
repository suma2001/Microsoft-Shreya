import {React, useEffect, useState} from "react";
import EventCard from '../../components/EventCard/EventCard';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { CircularProgress } from "@material-ui/core";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";

export default function AllGroups() {

  const [recommendedgroups, setRecommendedgroups] = useState();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user!==null) {
        fetch('/recommendedGroups',{
          headers:{
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'Authorization' : "Bearer "+ localStorage.getItem("token"),
            'weaknesses' : user.weaknesses
          }, 
        })
        .then( res => {
          if(res.status === 200) {
            return res.json()
          }})
        .then(result=>{
          setRecommendedgroups(result.recommendedGroups);
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
         : recommendedgroups==null ? (<p>Loading ... </p>)
         : recommendedgroups.length ? (<GridContainer cols={3}>
              {recommendedgroups.map( (event) => (
                <GridItem key={event._id}>
                  <EventCard key={event._id} event={event} />
                </GridItem>
                
          ))}
         </GridContainer>) : <SnackbarContent message="No Recommended Groups !!" dele="false"/>
        }
    </div>
  );
}


