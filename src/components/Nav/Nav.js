import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Login from '../Login/Login';
import Logout from '../Logout/Logout';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import AddNewPartner from '../AddNewPartner/AddNewPartner';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  post: state.post.unHiddenPosts
});

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    height: 100,
    backgroundColor: 'white',
  },
  social: {
    flexGrow: 1,
    margin: '0 auto',
  }
};

class Nav extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  sendToNewsfeed = () => {
    window.location.href = '#/newsfeed';
  }

  render() {
    const { classes } = this.props;
    let isSignedIn = false;
    this.props && this.props.user && this.props.user.userName && (isSignedIn = true);
    let user_type = this.props && this.props.user && this.props.user.userInfo && this.props.user.userInfo.user_type || false;
    const currentRoute = window.location.hash.split('/')[1];
    console.log('user', this.props.user)
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography onClick={this.sendToNewsfeed} variant="title" color="inherit" className={classes.flex}>
              <img id="logo"
                src="/images/Secondary_Logo_HorizontalTilted.jpg"
                alt="Local-Crate-Logo" />
            </Typography>
            <Typography onClick={this.sendToNewsfeed} variant="title" className={classes.social}>
              <span className="social-crate">
                Social Crate
              </span>
            </Typography>
            {
              (user_type === 'admin') && 
                [<Link to="/admin/accounts" key='accounts'>
                  <Button color="primary">
                    Partner accounts
                  </Button>
                </Link>,
                <Link to="/admin/posts" key='posts'>
                  <Button color="primary">
                    Posts
                  </Button>
                </Link>,
                <AddNewPartner key='new'/>]
            }
              {/* <Link to="/Register">
                <Button color="primary">
                  Register (new user)
                </Button>
              </Link> */}
            {(currentRoute !== 'newsfeed') &&
              <Link to="/newsfeed">
                <Button color="primary">
                  Newsfeed
                </Button>
              </Link>
            }
            {(currentRoute !== 'partner' && isSignedIn) &&
            <Link to={`/partner/${this.props.user.userInfo.partner_id}`}>
              <Button color="primary">
                Your Profile
              </Button>
            </Link>
            }
            {
              isSignedIn ?
                <Logout />
              :
                <Login />
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Nav);