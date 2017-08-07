import React from 'react';
import {Link, IndexLink} from 'react-router';
import classNames from 'classnames';

import './style.scss';
import logout from '../../images/logout.png';
import avatar from '../../images/avatar.png';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLogOut = ::this.onLogOut;
  }

  componentDidMount() {

  }

  onLogOut() {
    this.props.logout();
  }

  render() {
    return (
      <div className="app-header box-shadow">
        <ul className="nav navbar-nav pull-right">
          <li className={classNames("nav-item", "dropdown", {open: this.props.layout.accountPanel})}>
            <a className="nav-link dropdown-toggle clear" onClick={() => this.props.onAccountToggle()}>
              <img src={avatar} alt="" />
              <span>{this.props.session.data && this.props.session.data.realName}</span>
            </a>
            <div className="dropdown-menu pull-right dropdown-menu-scale">
              <span className="arrow top pull-right b-white" />
              <div className="logout" onClick={() => { this.onLogOut(); }}>
                <img src={logout} alt="" /><a>退出</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
