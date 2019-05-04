import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
import { getIP } from './Helper';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


function SignIn(props) {
  const { classes } = props;
  const toggleCallback = props.toggle;
  const history = props.history;
  var apiURL = "http://" + getIP() + ":3001/auth/login/";


  var queryParams = {};

  var handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    queryParams[name] = value;
  };

  var handleSubmit = () => {
    fetch(apiURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(queryParams)
    }).then(async response => {
      let content = await response.json();
      if (content.status === 201 || content.status === 200) {
        toast("Logged In Successfully!");
        props.history.push({
          pathname: '/chat',
          loginInfo: content,
          history: history
        });
      } else {
        toast('Username/Password incorrect');
      }
    })
  };

  return (
    <div>
      ( <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={handleChange} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* eslint-disable-next-line */}
            <Typography><a onClick={toggleCallback}>New User? Sign Up Here</a></Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign in
          </Button>
          </form>
        </Paper>
      </main>)
    </div>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func
};

export default withStyles(styles)(SignIn);

