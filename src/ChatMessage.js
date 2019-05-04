import React from 'react';
import Typography from '@material-ui/core/Typography';


export class ChatMessage extends React.Component {
    render() {
        return (
            <Typography>
                <small>{this.props.timestamp}</small>:{' '}
                <big>{this.props.message}</big>
            </Typography>
        );
    }
}