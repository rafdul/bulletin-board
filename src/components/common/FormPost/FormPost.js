import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../../views/NotFound/NotFound';
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
import {fetchAddPost, fetchEditPost, getPost} from '../../../redux/postsRedux';

import styles from './FormPost.module.scss';

class Component extends React.Component {

  state = {
    post: {
      _id: this.props.isNewAnnounce ? '' : this.props.postById._id,
      title: this.props.isNewAnnounce ? '' : this.props.postById.title,
      text: this.props.isNewAnnounce ? '' : this.props.postById.text,
      price: this.props.isNewAnnounce ? '' : this.props.postById.price,
      photo: this.props.isNewAnnounce ? null : this.props.postById.photo,
      author: this.props.isNewAnnounce ? '' : this.props.postById.author,
      location: this.props.isNewAnnounce ? '' : this.props.postById.location,
      phone: this.props.isNewAnnounce ? '' : this.props.postById.phone,
      status: this.props.isNewAnnounce ? '' : this.props.postById.status,
      created: this.props.isNewAnnounce ? '' : this.props.postById.created,
      updated: this.props.isNewAnnounce ? '' : this.props.postById.updated,
      file: null,
    },
    // file: [],
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
    // console.log('this.state', this.state);
  };

  handleChangePrice = (event) => {
    const { post } = this.state;
    console.log('event.target', event.target);

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
    // console.log('this.state', this.state);
  };

  handleImage = (file, event) => {
    const { post } = this.state;
    // const file = event.target.files;
    console.log('post w handleimage', post);
    console.log('event.target', event.target);
    console.log('file', file[0]);
    console.log('event', event);

    // if (file !== undefined) this.setState({ post: { ...post, photo: file[0].name }});
    if (file !== undefined) this.setState({ post: { ...post, photo: file[0].name, file: file[0] } });

  }

  submitForm = (event) => {

    const { post } = this.state;
    const { addPost, editPost, isNewAnnounce } = this.props;
    console.log('post w submitform', post);
    console.log('isNewAnnounce w submitForm', isNewAnnounce);

    console.log('this.state.file', this.state.file);
    event.preventDefault();

    if(post.title.length < 10) return alert('Min. 10 characters in title');
    if(post.text.length < 20) return alert('Min. 20 characters in text');
    if(post.price <= 0) return alert('Wrong price');
    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const authorMatched = post.author.match(authorPattern);
    const authorMatchedJoined = (authorMatched || []).join('');
    if(authorMatchedJoined.length < post.author.length) return alert('Wrong format email');

    if((post.title.length > 9) && (post.text.length > 19) && (post.author.length === authorMatchedJoined.length)) {
      if(isNewAnnounce) {
        post.created = new Date().toISOString();
        post.updated = post.created;

        const formData = new FormData();
        for (let key of ['_id', 'title', 'text', 'price', 'photo', 'author', 'location', 'phone', 'status', 'created', 'updated']) {
          formData.append(key, post[key]);
        }
        formData.append('file', post.file);
        addPost(formData);
        console.log('formData w add', formData);

        // console.log('dodawany post', post);
        // console.log('addPost(post)', addPost(post));
        // addPost(post);

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
      } else {
        post.updated = new Date().toISOString();

        const formData = new FormData();
        for (let key of ['_id', 'title', 'text', 'price', 'photo', 'author', 'location', 'phone', 'status', 'created', 'updated']) {
          formData.append(key, post[key]);
        }
        formData.append('file', post.file);
        editPost(formData);
        console.log('formData w edit', formData);

        // console.log('dodawany post', post);
        // console.log('editPost(post)', editPost(post));
        // editPost(post);

        alert('Your post was edit.');
      }
    }
  };

  render() {
    const {className, user, postById, isNewAnnounce } = this.props;
    const { post } = this.state;

    console.log('isNewAnnounce', isNewAnnounce);

    return(
      <div className={clsx(className, styles.root)}>
        <h2>{isNewAnnounce ? 'Add new post' : 'Edit post'}</h2>
        <Grid container spacing={3} className={styles.addContainer} justify="center">
          <Grid item xs={12} sm={9}>
            {user.active === true
              ?
              <Paper className={styles.paperCard} >
                {/* <form onSubmit={this.submitForm} method="put" encType="multipart/form-data" action={`/posts/${postById.photo}/edit`}> */}
                <form onSubmit={this.submitForm} >
                  <Typography variant="h6" gutterBottom align="center">
                    {isNewAnnounce ? 'Fill in the form' : 'Edit your announcement'}
                  </Typography>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="title" label="Title" defaultValue={isNewAnnounce ? '' : postById.title} fullWidth onChange={this.handleChange} helperText="min. 10 characters"/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="text" label="Describe" defaultValue={isNewAnnounce ? '' : postById.text} fullWidth multiline onChange={this.handleChange} helperText="min. 20 characters"/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="price" label="Price ($)" defaultValue={isNewAnnounce ? '' : postById.price} fullWidth type="number" onChange={this.handleChangePrice}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField required name="author" label="Email address" defaultValue={isNewAnnounce ? '' : postById.author} fullWidth onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField name="phone" label="Phone number" defaultValue={isNewAnnounce ? '' : postById.phone} fullWidth type="number" onChange={this.handleChange}/>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField name="location" label="Localization" defaultValue={isNewAnnounce ? '' : postById.location} fullWidth onChange={this.handleChange}/>
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
                    {isNewAnnounce ? null :
                      <Typography variant="body2" gutterBottom align="center">
                        Your photo: {postById.photo}
                      </Typography>
                    }
                    {/* <div onChange={this.handleSubmit}>
                      <input type="file" name="image" accept="image/*" ref={this.fileInput} ></input>
                    </div> */}

                    <ImageUploader
                      name="file"
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
  user: PropTypes.object,
  isNewAnnounce: PropTypes.bool,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addPost: PropTypes.func,
  editPost: PropTypes.func,
};

const mapStateToProps = state => ({
  postById: getPost(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
  editPost: (post) => dispatch(fetchEditPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as FormPost,
  Container as FormPost,
  Component as FormPostComponent,
};
