import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
// import { PostEdit } from './components/views/PostEdit/PostEdit';
// import { PostAdd } from './components/views/PostAdd/PostAdd';
import { FormPost } from './components/common/FormPost/FormPost';
import { NotFound } from './components/views/NotFound/NotFound';
import {Switcher} from './components/common/Switcher/Switcher';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switcher />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/post/add' render={() => <FormPost isNewAnnounce={true}/>} />
              <Route exact path='/post/:id' component={Post} />
              <Route exact path='/post/:id/edit' render={() => <FormPost isNewAnnounce={false}/>} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  statusTrue: PropTypes.bool,
};


export { App };
