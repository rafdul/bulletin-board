import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';
import ImageUploader from 'react-images-upload';

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
import {getAll, fetchAddPost} from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';


class Component extends React.Component {
  state = {
    post: {
      // _id: '',
      title: '',
      text: '',
      price: '',
      photo: null,
      author: '',
      location: '',
      phone: '',
      status: '',
      created: '',
      updated: '',
    },
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
    // console.log('this.state', this.state);
  };

  handleChangePrice = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
    // console.log('this.state', this.state);
  };

  handleImage = (files) => {
    const { post } = this.state;
    // console.log('files', files[0].name);

    if (files !== undefined) this.setState({ post: { ...post, photo: files[0].name } });
  }

  submitForm = (event) => {

    const { post } = this.state;
    const { addPost } = this.props;
    // event.preventDefault();

    if(post.title.length < 10) return alert('Min. 10 characters in title');
    if(post.text.length < 20) return alert('Min. 20 characters in text');
    if(post.price <= 0) return alert('Wrong price');
    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const authorMatched = post.author.match(authorPattern);
    const authorMatchedJoined = (authorMatched || []).join('');
    if(authorMatchedJoined.length < post.author.length) return alert('Wrong format email');

    if((post.title.length > 9) && (post.text.length > 19) && (post.author.length === authorMatchedJoined.length)) {
      post.created = new Date().toISOString();
      post.updated = post.created;
      console.log('dodawany post', post);
      addPost(post);

      this.setState({
        post: {
          // _id: '',
          title: '',
          text: '',
          price: '',
          photo: '',
          author: '',
          location: '',
          phone: '',
          status: '',
          created: '',
          updated: '',
        },
      });

      alert('Your post was added.');
    }
  };

  render() {
    const {className, user } = this.props;
    const { post } = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        <h2>Add new post</h2>
        <Grid container spacing={3} className={styles.addContainer} justify="center">
          <Grid item xs={12} sm={9}>
            {user.active === true
              ?
              <Paper className={styles.paperCard}>
                <form onSubmit={this.submitForm}>
                  <Typography variant="h6" gutterBottom align="center">
                    Fill in the form
                  </Typography>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="title" label="Title" fullWidth onChange={this.handleChange} helperText="min. 10 characters"/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="text" label="Describe" fullWidth multiline onChange={this.handleChange} helperText="min. 20 characters"/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="price" label="Price ($)" fullWidth type="number" onChange={this.handleChangePrice}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="author" label="Email address" fullWidth onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField name="phone" label="Phone number" fullWidth type="number" onChange={this.handleChange}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField name="location" label="Localization" fullWidth onChange={this.handleChange}/>
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
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose image'
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={this.handleImage}
                      singleImage={true}
                      className={styles.file}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item} align="center">
                    <Button variant="outlined" type="submit" color="secondary" className={styles.paperCard__btn}>
                      Submit
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
  postsAll: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      datePublication: PropTypes.string,
      dateLastUpdate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  addPost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
