import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhoneAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost, fetchPost } from '../../../redux/postsRedux';

import styles from './Post.module.scss';


class Component extends React.Component {

  // console.log('postById:', postById);
  componentDidMount() {
    const { fetchOnePost } = this.props;
    fetchOnePost();
  }

  render() {
    const {className, postById, user} = this.props;

    return(
      <div className={clsx(className, styles.root)}>
        <h2>Post: {postById.title}</h2>
        <Grid container spacing={3} className={styles.postContainer}>
          <Grid item xs={12} sm={5} className={styles.postItem}>
            <div className={styles.postItem__imageBox}>
              <img src={postById.photo} alt={postById.title} className={styles.postImage}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} className={styles.postItem}>
            <Card>
              <CardContent>
                {user.active === true
                  ?
                  <div className={styles.postItem__link}>
                    <Link to={`/post/${postById._id}/edit`} variant="subtitle1" color="secondary">
                      <Fab size="small" color="secondary" aria-label="add" variant="extended">Edit post</Fab>
                    </Link>
                  </div>
                  :
                  null
                }
                <div className={styles.postItem__group}>
                  <Typography color="textSecondary" variant="body2">
                    Status: {postById.status}
                  </Typography>
                  <Typography variant="h5">
                    {postById.price}
                  </Typography>
                </div>
                <Typography variant="subtitle1" className={styles.postItem__content}>
                  {postById.text}
                </Typography>
                <Typography variant="subtitle1" className={styles.postItem__content}>
                  Contact
                  <div>
                    <FontAwesomeIcon icon={faAt} className={styles.icon}/> {postById.author}<br/>
                    <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/> {postById.phone}<br/>
                    <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon}/> {postById.location}
                  </div>
                </Typography>
                <Typography color="textSecondary" variant="body2" className={styles.postItem__content}>
                  <span>Publication: {postById.created}</span>
                  <span>Updated: {postById.updated}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // postById: PropTypes.objectOf(
  //   PropTypes.shape({
  //     _id: PropTypes.string,
  //     title: PropTypes.string,
  //     text: PropTypes.string,
  //     created: PropTypes.string,
  //     updated: PropTypes.string,
  //     author: PropTypes.string,
  //     status: PropTypes.string,
  //     photo: PropTypes.string,
  //     price: PropTypes.number,
  //     phone: PropTypes.string,
  //     location: PropTypes.string,
  //   }),
  // ),
  fetchOnePost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  postById: getPost(state),
  user: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
