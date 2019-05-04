import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
import { statify, getIP } from './Helper';

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


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.classes,
            toggleCallback: this.props.toggle,
            apiURL: '',
            queryParams: {}
        }
    }

    componentWillMount = () => {
        let apiURL = "http://" + getIP() + ":3001/auth/register/"
        this.setState({ apiURL });
    }

    handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        let qp = {};
        qp[name] = value;
        this.setState({ queryParams: statify(qp, this.state.queryParams) }, () => {
            // console.log(this.state.queryParams)
        });
    };

    handleSubmit = () => {
        fetch(this.state.apiURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.queryParams)
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                toast("User Succesfully Created.\r\nConfirm Email and Sign In");
                this.state.toggleCallback();
                // this.props.history.push({
                //     pathname: '/signin',
                //     toggle: this.state.toggleCallback
                // });
            } else {
                toast(response.statusText);
            }
        })
    };

    render = () => {
        return (
            <div>
                ( <main className={this.state.classes.main}>
                    <CssBaseline />
                    <Paper className={this.state.classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                    </Typography>
                        <form className={this.state.classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" autoComplete="username" onChange={this.handleChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                            </FormControl>
                            {/* eslint-disable-next-line */}
                            <Typography><a onClick={this.state.toggleCallback}>Sign In Instead? Click here</a></Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.state.classes.submit}
                                onClick={this.handleSubmit}
                            >
                                Sign up
                        </Button>
                        </form>
                    </Paper>
                </main>)
    </div>
        );
    }
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    toggle: PropTypes.func
};

export default withStyles(styles)(SignUp);