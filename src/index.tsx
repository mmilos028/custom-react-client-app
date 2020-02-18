import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory, createHashHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { createAppStore } from './redux/stores/AppStore';

import indexRoutes from "./routes/Index";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from './theme/Theme';

//import * as serviceWorker from './serviceWorker';

//const hist = createBrowserHistory();
const hist = createHashHistory();

/*
const routing = (
  <Switch>
    {indexRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);
*/

const routing = () => (
  <Switch>
    {indexRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
)

ReactDOM.render(
    <MuiThemeProvider theme={Theme}>
      <Provider store={createAppStore()}>
        <Router history={hist}>
          {
            routing()
          }
      </Router>
    </Provider>  
  </MuiThemeProvider>, 
  document.querySelector('#root')
);

/*
serviceWorker.register(
  {
    onSuccess: () => { console.log("Service Worker on Success"); },
    onUpdate: () => { console.log("Service Worker on Update"); }
  }
);*/
