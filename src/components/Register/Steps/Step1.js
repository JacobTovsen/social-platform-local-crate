import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
    },
});

const ranges = [
    {
      value: 'Farmer',
      label: 'Farmer',
    },
    {
      value: 'Maker',
      label: 'Maker',
    },
    {
      value: 'Supplier',
      label: 'Supplier',
    },
  ];  

class Step1 extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
            <div className="registration-container">
                <Paper>
                    <div className="registration-inputs-container">
                            <h2>Create your account</h2>
                            <br/>
                            <TextField
                            id="name"
                            label="Name"
                            value={this.props.state.partner.name}
                            onChange={this.props.handleChangeFor('name')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                            id="location"
                            label="Location"
                            value={this.props.state.partner.location}
                            onChange={this.props.handleChangeFor('location')}
                            margin="normal"
                            />
                            <br/>
                            <TextField
                                select
                                label="Partner"
                                className={classNames(classes.margin, classes.textField)}
                                value={this.props.state.partner.type}
                                onChange={this.props.handleChangeFor('type')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                >
                                {ranges.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <br/>
                            <Button variant="contained" color="primary" >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.props.nextStep}>
                                Next
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

Step1.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Step1);