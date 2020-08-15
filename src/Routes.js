import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Listing from './Listing/Listing';
import Detail from './Detail/Detail';
import NotFoundPage from './NotFoundPage';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

const RoutesWrap = () => {
  return (
    <Router>
      <div>
        <Header />
        <SideBar />
      </div>
      <Route component={Routes} />
    </Router>
  );
};

const Routes = props => {
  return (
    <Switch>
        <Redirect exact={true} from="/" to="/reps" />
        <Route exact={true} path="/reps" component={Listing} />
        <Route exact={true} path="/reps/:rep_id" component={Detail} />
        <Route component={NotFoundPage} />
    </Switch>
  );
};

export default RoutesWrap;
