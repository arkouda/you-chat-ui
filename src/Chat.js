import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

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
      }
    }
});

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // handleChange = (event) => {
    //     const name = event.currentTarget.name;
    //     const value = event.currentTarget.value;
    //     queryParams[name] = value;
    //     console.log(queryParams);
    // };

    // handleSubmit = () => {
    //     fetch('', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //           },
    //         body: JSON.stringify(queryParams)
    //     })
    // };
    render = () => {
        return (
            <div>
                <Typography><h1>YouChat</h1></Typography>
            </div>
        );
    }
}

export default withStyles(styles)(Chat);