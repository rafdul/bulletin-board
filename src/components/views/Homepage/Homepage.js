import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinkUI from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';

import clsx from 'clsx';
import uniqid from 'uniqid';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }

  render() {
    const {className, postsAll, user} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        {/* {console.log('value.statusTrue w homepage', value.statusTrue)} */}
        <div className={styles.announcement}>
          {user.active === true
            ?
            <Link to={'/post/add'} className={styles.announcement__link}>
              <Fab size="small" color="primary" aria-label="add" variant="extended">Add announcement</Fab>
            </Link>
            :
            <LinkUI href="#" className={styles.announcement__link}>
              <Fab size="small" color="secondary" aria-label="add" variant="extended">Login</Fab>
            </LinkUI>
          }
        </div>
        <div className={styles.card}>
          {postsAll.map(post => (
            <div key={post._id ? post._id : uniqid()} className={styles.card__item}>
              {/* {console.log('key:', post._id)} */}
              <Card  className={styles.flex}>
                <CardActionArea>
                  <Link to={`/post/${post._id}`} className={styles.link}>
                    <div className={styles.imageConatiner}>
                      <CardMedia
                        className={styles.image}
                        component="img"
                        image={`${IMAGES_URL}/${post.photo}`}
                        title={post.photo}
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {post.text}
                      </Typography>
                      <div className={styles.price}>
                        <Typography component="p" variant="subtitle2">Price: {post.price}</Typography>
                        <Typography component="p" variant="subtitle2">Location: {post.location}</Typography>
                      </div>
                    </CardContent>
                  </Link>
                </CardActionArea>
                <CardActions className={styles.card__btn}>
                  <Button size="small" color="primary" href={`/post/${post._id}`} >
                    Show more
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  postsAll: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // postsAll: PropTypes.arrayOf(
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
  //   })
  // ),
  statusTrue: PropTypes.bool,
  state: PropTypes.bool,
  fetchPublishedPosts: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
