import React from "react";
import { InputLabel, Select, MenuItem, FormControl, TextField} from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import functions from "../../actions/functions";
const {postEvent} = functions;

toast.configure()

const classes = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  marginInputField: {
    marginTop:"25px",
  },
  paddingInputField: {
    paddingTop: "25px",
  }
};

class CreateGroup extends React.Component {

  user = localStorage.getItem("user");
  
  constructor(props) {
    super(props);
    this.state = {
      course: "",
      subject: "",
      username: "",
      date: "",
      time: "",
      description: "",
      size: "",
      url: "",
      image: ""
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleFileChange = (event) => {
    this.setState({[event.target.name]: event.target.files[0]});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    var body = this.state
    body.username = user.username

    if(this.state.course==="" || this.state.subject==="" || this.state.date==="" || this.state.time==="" || this.state.description==="" || this.state.size==="") {
      toast.error("Fields empty !!", {autoClose: 3000});
    }

    else {
      postEvent(body);
    }  
  }

  render() {

    const { course, subject, date, time, description, size } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Group</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      error={false}
                      label="Branch"
                      id="course"
                      name="course"
                      value={course}
                      onChange={this.handleChange}
                      style={classes.marginInputField}
                      fullWidth
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      error={false}
                      label="Subject"
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={this.handleChange}
                      style={{marginTop: "25px"}}
                      fullWidth
                      required
                    />
                  </GridItem>
                  </GridContainer>
          
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={classes.marginInputField} fullWidth>
                    
                      <InputLabel id="demo-simple-select-autowidth-label" >Group Size</InputLabel>
                      <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          name="size"
                          value={size}
                          onChange={this.handleChange}
                          label="Group Size"
                          required
                          >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={"10-50"}>10 - 50</MenuItem>
                          <MenuItem value={"50-100"}>50 - 100</MenuItem>
                          <MenuItem value={"100-300"}>100 - 300</MenuItem>
                      </Select>
                  </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    error={false}
                    label="Created By (Username)"
                    id="username"
                    name="username"
                    value= {"@" + user.username}
                    style={classes.marginInputField}
                    fullWidth
                    disabled={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                  margin="normal"
                  required
                  name="date"
                  type="date"
                  id="date"
                  onChange={this.handleChange}
                  style={classes.paddingInputField}
                  autoComplete="date"
                  value={date}
                />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <TextField
                  margin="normal"
                  required
                  name="time"
                  type="time"
                  id="time"
                  onChange={this.handleChange}
                  style={classes.paddingInputField}
                  autoComplete="time"
                  value={time}
                />
                  </GridItem>
                  </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label="Description"
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.handleChange}
                      style={classes.marginInputField}
                      multiline
                      fullWidth
                      required
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit}>Create</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        </form>
      </div>
    );
  }
}

export default CreateGroup;


