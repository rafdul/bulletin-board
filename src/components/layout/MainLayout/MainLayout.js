import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../Header/Header';
import {Switcher} from '../../common/Switcher/Switcher';

import StatusContext from '../../../context/StatusContext';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';

const Component = ({className, children}) => {

  const [ statusTrue , setStatusUser ] = useState(true);
  // console.log('children', children);
  // console.log('children.props.children', children.props.children);

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <Switcher setStatusUser={setStatusUser}/>
        {/* <Header statusTrue={statusTrue} /> */}
        {React.cloneElement(<Header />, { statusTrue: statusTrue })}
        <StatusContext.Provider value={{statusTrue}}>
          {children}
        </StatusContext.Provider>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // props: PropTypes.bool,
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
