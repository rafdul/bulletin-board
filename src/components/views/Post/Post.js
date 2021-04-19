import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhoneAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import StatusContext from '../../../context/StatusContext';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll, getOnePost } from '../../../redux/postsRedux';

import styles from './Post.module.scss';


const Component = ({className, postById}) => {

  // console.log('postById:', postById);

  return(
    <StatusContext.Consumer>
      { value => (
        <div className={clsx(className, styles.root)}>
          <h2>Post: {postById.title}</h2>
          <Grid container spacing={3} className={styles.postContainer}>
            <Grid item xs={12} sm={5} className={styles.postItem}>
              <div className={styles.postItem__imageBox}>
                <img src={postById.image} alt={postById.title} className={styles.postImage}/>
              </div>
            </Grid>
            <Grid item xs={12} sm={7} className={styles.postItem}>
              <Card>
                <CardContent>
                  {value.statusTrue
                    ?
                    <div className={styles.postItem__link}>
                      <Link href="#" variant="subtitle1" color="secondary" >Edit post</Link>
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
                    {postById.content}
                  </Typography>
                  <Typography variant="subtitle1" className={styles.postItem__content}>
                    Contact
                    <div>
                      <FontAwesomeIcon icon={faAt} className={styles.icon}/> {postById.email}<br/>
                      <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/> {postById.phone}<br/>
                      <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon}/> {postById.location}
                    </div>
                  </Typography>
                  <Typography color="textSecondary" variant="body2" className={styles.postItem__content}>
                    <span>Publication: {postById.datePublication}</span>
                    <span>Updated: {postById.dateLastUpdate}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </StatusContext.Consumer>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  params: PropTypes.object,
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
  postsAll: getAll(state),
  postById: getOnePost(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
