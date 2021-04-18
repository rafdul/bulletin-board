import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Grid container spacing={3} justify="center" className={styles.container}>
      <Grid item xs={12} sm={9}>
        <Paper className={styles.paperCard}>
          <h1 className={styles.paperCard__textError}>
            <FontAwesomeIcon icon={faTimesCircle} className={styles.icon}/> Page not found
          </h1>
          <p>
            <Link to={'/'} className={styles.paperCard__link}>Back to homepage</Link>
          </p>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
