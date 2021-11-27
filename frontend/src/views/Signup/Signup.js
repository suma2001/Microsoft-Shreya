import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Chip } from "@material-ui/core";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import functions from "../../actions/functions";
const {postUser} = functions;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

class Signup extends React.Component {

    state = {
        username: '',
        password: '',
        reenterPassword: '',
        weakness:'',
        weaknesses : [],
        showPsw: false,
        showRePsw: false,
        invalidCredentials: false
    };

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleWeaknessChange = event => {
        const {value} = event.target;
        this.setState({
          weakness: value
      })}

    handleArrayChange = () => {
        this.setState(prevState => ({
          weaknesses: [...prevState.weaknesses, this.state.weakness]
        }))
      }
    onPswChange = e => {
        const { value } = e.target
        this.setState({ password: value })
    }
    
    onRePswChange = e => {
        const { value } = e.target
        this.setState({ reenterPassword: value })
    }
    
    handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.username !== "" && this.state.password === this.state.reenterPassword && this.state.weaknesses.length!==0) {
        this.setState({ invalidCredentials: false })
          postUser(this.state.username, this.state.password, this.state.weaknesses)
        } else {
            toast.error('Fields empty !', {autoClose: 3000});
        }
    };
    
    render() {
        return (
            <ThemeProvider theme={theme}>
              <Grid container component="main" >
                <CssBaseline />
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  style={{
                    backgroundImage: 'url(https://www.princetonreview.com/cms-content/how-to-make-the-most-out-of-mcat-study-group.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        autoComplete="username"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onPswChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="reenterPassword"
                        label="Re-enter Password"
                        type="password"
                        id="reenterPassword"
                        autoComplete="current-password"
                        value={this.state.reenterPassword}
                        onChange={this.onRePswChange}
                      />
                        {
                            this.state.weaknesses.length!== 0? <div style={{display: 'flex', flexDirection: 'row' }} > 
                            {this.state.weaknesses.map(item=>{
                            return <span key={item}> <Chip style={{margin:'4px'}} label={item} variant="outlined"></Chip></span>
                            })}
                            </div>:<p></p>
                        }
                        <div style={{display:'flex',flexDirection: 'row',justifyContent:'space-evenly'}}>
                            <TextField
                                label="Enter Your Weaknesses"
                                name="username"
                                
                                variant="outlined"
                                value={this.state.weakness}
                                onChange={this.handleWeaknessChange}
                                fullWidth
                                autoFocus
                                margin="normal"
                            />
                            <Button onClick={this.handleArrayChange}>Add</Button>
                        </div>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="/login" variant="body2">
                            {"Already have an account? Sign In"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: 5 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
          );
  }
  
}

export default Signup;