import React from 'react';
import {Route, Router, IndexRoute} from 'react-router';
import {Layout, LoginPage, RegisterPage, IndexPage, accountStudentInfoPage, accountStudentEventPage, eventAllPage, eventEditPage, eventViewPage, accountSponsorInfoPage, accountSponsorEventPage, eventCheckPage, accountSecurityPage} from '../containers';

const authCheck = (nextState, replace) => {
  // const session = JSON.parse(localStorage.getItem('session'));
  // if (!session) {
    // replace('/login');
  // }
};

export default(
  <Router>
    <Route path="/" component={Layout} onEnter={authCheck}>
      <IndexRoute component={IndexPage} />
      <Route path="account">
        <Route path="student">
          <Route path="info" component={accountStudentInfoPage} />
          <Route path="event" component={accountStudentEventPage} />
        </Route>
        <Route path="sponsor">
          <Route path="info" component={accountSponsorInfoPage} />
          <Route path="event" component={accountSponsorEventPage} />
        </Route>
        <Route path="security" component={accountSecurityPage} />
      </Route>
      <Route path="event">
        <Route path="all" component={eventAllPage} />
        <Route path="new" component={eventEditPage} />
        <Route path="edit/:id/" component={eventEditPage} />
        <Route path="view/:id/" component={eventViewPage} />
        <Route path="check/:id/" component={eventCheckPage} />
      </Route>
    </Route>
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
  </Router>
);
