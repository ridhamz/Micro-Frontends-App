import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default function App({ history, onSignIn }) {
  // app
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route exact path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
}
