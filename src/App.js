import React, { useEffect, Suspense, lazy } from 'react';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import firebase from 'firebase';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './redux/store';
import Loading from './_reusable/loading';
import themeConfig from './theme.json';

const firebaseConfig = {
  apiKey: 'AIzaSyDP_A0cfPxiYvR2DYdPNQhYQgG_rwEsrE8',
  authDomain: 'budge-90c56.firebaseapp.com',
  databaseURL: 'https://budge-90c56.firebaseio.com',
  projectId: 'budge-90c56',
  storageBucket: 'budge-90c56.appspot.com',
  messagingSenderId: '325017828912',
  appId: '1:325017828912:web:e40cb6aba0649aa427f7f5',
  measurementId: 'G-X3SFQTBBTX',
};

function App() {
  const theme = createMuiTheme(themeConfig);
  const SignInScreen = lazy(() => import('./components/SignInScreen'));
  const SignUpScreen = lazy(() => import('./components/SignUpScreen'));
  const RecoveryScreen = lazy(() => import('./components/Auth/RecoveryScreen'));
  const Screens = lazy(() => import('./components/Screens'));

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/signin" component={SignInScreen} />
              <Route exact path="/signup" component={SignUpScreen} />
              <Route exact path="/recovery" component={RecoveryScreen} />
              <Route path="/" component={Screens} />
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
