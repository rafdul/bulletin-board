import React from 'react';
import PropTypes from 'prop-types';
import {Header} from '../Header/Header';

import clsx from 'clsx';


import styles from './MainLayout.module.scss';

const Component = ({className, children}) => {

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
