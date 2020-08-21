import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Listing from './components/Listing/Listing';
import Detail from './components/Detail/Detail';
import NotFoundPage from './components/NoPage/NoPage';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

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
