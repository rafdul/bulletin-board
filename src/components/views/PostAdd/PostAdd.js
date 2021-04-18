import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusContext from '../../../context/StatusContext';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({className}) => (
  <StatusContext.Consumer>
    {value => (
      <div className={clsx(className, styles.root)}>
        <h2>Add new post</h2>
        <Grid container spacing={3} className={styles.addContainer} justify="center">
          <Grid item xs={12} sm={9}>
            {value.statusTrue
              ?
              <Paper className={styles.paperCard}>
                <Typography variant="h6" gutterBottom align="center">
                  Fill in the form
                </Typography>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField required id="title" name="title" label="Title" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField required id="content" name="content" label="Describe" fullWidth multiline/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField required id="price" name="price" label="Price ($)" fullWidth type="number"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField id="image" name="image" label="Image" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField required id="email" name="email" label="Email address" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField required id="phone" name="phone" label="Phone number" fullWidth type="number"/>
                </Grid>
                <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                  <TextField id="city" name="city" label="Localization" fullWidth/>
                </Grid>
              </Paper>
              :
              <Paper className={styles.paperCard}>
                <h2 className={styles.paperCard__textError}>Only for logged user</h2>
                <p>
                  <Link className={styles.paperCard__link}>Login</Link>
                </p>
                <p>
                  <Link to={'/'} className={styles.paperCard__link}>Back to homepage</Link>
                </p>
              </Paper>
            }
          </Grid>
        </Grid>
      </div>
    )}
  </StatusContext.Consumer>
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
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
