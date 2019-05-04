import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { ChatMessageHistory } from './ChatMessageHistory';
import { getIP } from './Helper';
import { toast } from 'react-toastify';

const io = require('socket.io-client')

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
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.classes,
            message: '',
            messageHistory: [],
            loginInfo: this.props.location.loginInfo,

        };
    }

    componentWillMount = () => {
        if(!this.state.loginInfo) {
            toast("Sign In First!!");
            this.props.history.push('/signin');
        }
        const socket = io.connect('http://' + getIP() + ':3001');
        this.setState({ socket }, () => {
            console.log('socket initialized!');
            this.state.socket.on('newMessage', async (data) => {
                let messageH = this.state.messageHistory;
                let newMessage = {
                    text: data.message,
                    username: data.username
                }
                messageH.push(newMessage);
                await this.setState({ messageHistory: messageH });
            });
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentWillUpdate = () => {
        this.scrollToBottom();
    }

    handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({ [name]: value }, () => {
            console.log(this.state);
        });
    }

    handleSubmit = () => {
        this.state.socket.emit('newMessage', { message: this.state.message, username: this.state.loginInfo.username });
    }

    // handleChange = (event) => {
    //     const name = event.currentTarget.name;
    //     const value = event.currentTarget.value;
    //     let message = { };
    //     message[name] = value;
    //     this.setState({ queryParams: statify(qp, this.state.queryParams) }, () => {
    //         // console.log(this.state.queryParams)
    //     });
    // };

    render = () => {
        return (
            <div>
                <CssBaseline />
                <Paper className={this.state.classes.paper}>
                    <Typography component="h2" variant="h1" gutterBottom>YouChat</Typography>
                    <ChatMessageHistory messages={this.state.messageHistory} />
                    <Input fullWidth id="message" name="message" autoFocus onChange={this.handleChange} />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.state.classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Send!
                    </Button>
                </Paper>
                <div style={{ float: "left", clear: "both", padding: "0px 0px 45px 0px" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    toggle: PropTypes.func
};

export default withStyles(styles)(Chat);