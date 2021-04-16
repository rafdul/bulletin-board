import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { getStatusUser, loadStatusUser } from '../../../redux/statusUserRedux';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Switcher.module.scss';


const Component = ({className, setStatusUser}) => {

  const handleOnChange = (event) => {
    console.log('event w funkcji', event);
    if(event === 'true') {
      setStatusUser(true);
    } else {
      setStatusUser(false);
    }
  };

  return(
    <div>
      <div className={clsx(className, styles.root)}>
        <select name="statusUser" id="isLogged" onChange={(event) => handleOnChange(event.target.value)}>
          <option value="true">View for logged user</option>
          <option value="false">View for unlogged user</option>
        </select>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  setStatusUser: PropTypes.func,
};

// const mapStateToProps = state => ({
//   isLogged: getStatusUser(state),
//   // someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   loadStatus: () => dispatch(loadStatusUser()),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Switcher,
  // Container as Switcher,
  // Component as SwitcherComponent,
};
