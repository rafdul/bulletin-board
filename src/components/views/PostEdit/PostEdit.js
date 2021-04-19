import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusContext from '../../../context/StatusContext';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll, getOnePost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  render() {
    const { className, postById } = this.props;
    console.log('postById', postById);

    return(
      <StatusContext.Consumer>
        { value => (
          <div className={clsx(className, styles.root)}>
            <h2>Edit &quot;{postById.title}&quot; (id: {postById.id}) </h2>
            <Grid container spacing={3} className={styles.addContainer} justify="center">
              <Grid item xs={12} sm={9}>
                {value.statusTrue
                  ?
                  <Paper className={styles.paperCard}>
                    <form>
                      <Typography variant="h6" gutterBottom align="center">
                        Edit your announcement
                      </Typography>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required id={postById.title} value={postById.title} name="title" label="Title" fullWidth onChange={this.handleChange} helperText="min. 10 characters" className={styles.textInput}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required id={postById.content} value={postById.content} name="content" label="Describe" fullWidth multiline onChange={this.handleChange} helperText="min. 20 characters"/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required id={postById.price} value={postById.price} name="price" label="Price ($)" fullWidth type="number" onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required id={postById.email} value={postById.email} name="email" label="Email address" fullWidth onChange={this.handleChange} />
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField id={postById.phone} value={postById.phone} name="phone" label="Phone number" fullWidth type="number" onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField id={postById.location} value={postById.location} name="location" label="Localization" fullWidth onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <FormControl required fullWidth variant="filled">
                          <InputLabel id="demo-simple-select-label">Status</InputLabel>
                          <Select labelId="demo-simple-select-label" fullWidth name="status" value={postById.status} onChange={this.handleChange} >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                            <MenuItem value="finished">Finished</MenuItem>
                          </Select>
                        </FormControl>
                        <FormHelperText>Choose status your announcement</FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <Typography variant="body1" gutterBottom align="center">
                          Add photo
                        </Typography>
                        <label className={styles.file}>
                          <input id={postById.image} type="file" name="image" accept="image/*" onChange={this.handleImage}></input>
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item} align="center">
                        <Button variant="outlined" type="submit" color="secondary" className={styles.paperCard__btn}>
                          Save
                        </Button>
                      </Grid>
                    </form>
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
  }
}

Component.propTypes = {
  className: PropTypes.string,
  postById: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    datePublication: PropTypes.string,
    dateLastUpdate: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
  }),
};

const mapStateToProps = (state, props) => ({
  postById: getOnePost(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
