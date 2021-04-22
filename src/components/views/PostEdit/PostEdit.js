import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';

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
import { getOnePost, editPost, getAll } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

class Component extends React.Component {
  state = {
    post: {
      // id: this.props.postById.id,
      title: this.props.postById.title,
      content: this.props.postById.content,
      price: this.props.postById.price,
      image: this.props.postById.image,
      email: this.props.postById.email,
      location: this.props.postById.location,
      phone: this.props.postById.phone,
      status: this.props.postById.status,
      datePublication: this.props.postById.datePublication,
      dateLastUpdate: this.props.postById.dateLastUpdate,
    },
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
  };

  handleImage = (file) => {
    const { post } = this.state;

    if (file) this.setState({ post: { ...post, [post.image]: file[0] } });
    else this.setState({ post: { ...post, image: null } });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { editPost } = this.props;

    post.dateLastUpdate = new Date().toISOString();
    editPost(post);

    // console.log('addPost', editPost);
  }


  render() {
    const { className, postById, user } = this.props;
    const {post} = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        <h2>Edit &quot;{postById.title}&quot; </h2>
        <Grid container spacing={3} className={styles.addContainer} justify="center">
          <Grid item xs={12} sm={9}>
            {user.active === true
              ?
              <Paper className={styles.paperCard}>
                <form onSubmit={this.submitForm}>
                  <Typography variant="h6" gutterBottom align="center">
                    Edit your announcement
                  </Typography>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required defaultValue={postById.title} name="title" label="Title" fullWidth onChange={this.handleChange} helperText="min. 10 characters" className={styles.textInput}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required defaultValue={postById.content} name="content" label="Describe" fullWidth multiline onChange={this.handleChange} helperText="min. 20 characters"/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required defaultValue={postById.price} name="price" label="Price ($)" fullWidth type="number" onChange={this.handleChange}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required defaultValue={postById.email} name="email" label="Email address" fullWidth onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField defaultValue={postById.phone} name="phone" label="Phone number" fullWidth type="number" onChange={this.handleChange}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField defaultValue={postById.location} name="location" label="Localization" fullWidth onChange={this.handleChange}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <FormControl required fullWidth variant="filled">
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select labelId="demo-simple-select-label" fullWidth name="status" value={post.status} onChange={this.handleChange} >
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
                      <input type="file" name="image" accept="image/*" onChange={this.handleImage}></input>
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
              <NotFound />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // postById: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     title: PropTypes.string,
  //     content: PropTypes.string,
  //     datePublication: PropTypes.string,
  //     dateLastUpdate: PropTypes.string,
  //     email: PropTypes.string,
  //     status: PropTypes.string,
  //     image: PropTypes.string,
  //     price: PropTypes.number,
  //     phone: PropTypes.string,
  //     location: PropTypes.string,
  //   }),
  // ),
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  // postById: getOnePost(state, props.match.params.id),
  postById: getAll(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  editPost: (post) => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
