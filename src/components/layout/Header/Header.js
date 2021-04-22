import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import styles from './Header.module.scss';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({className, user}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar className={styles.menu}>
        <Typography variant="h6">
          <Link to={'/'} className={styles.menu__logo}>Bulletin Board</Link>
        </Typography>
        <div>
          {user.active === true
            ?
            'My announcements'
            :
            <Button color="inherit" variant="outlined" href="https://google.com">
              Login
              <FontAwesomeIcon icon={faUser} className={styles.icon}/>
            </Button>
          }
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  setIsLogged: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
