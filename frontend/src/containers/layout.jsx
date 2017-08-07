import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import classNames from 'classnames';
import moment from 'moment';
import * as baseActions from '../actions/base';
import * as sessionActions from '../actions/session';
import {myHistory} from '../config';

import logImg from '../images/logo.png';
import avatarImg from '../images/a2.jpg';

const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  eventall: state.eventall,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    ...sessionActions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.setPanelOff = ::this.setPanelOff;
    this.onAccountToggle = ::this.onAccountToggle;
    this.onLogout = ::this.onLogout;
    this.onSubmit = ::this.onSubmit;
    moment.locale('zh-cn');
  }

  componentWillMount() {
    this.props.actions.requestAuth().then(res => {
      this.props.actions.setUIElement('layout', 'fetching', true);
    });
  }

  componentDidMount() {

  }

  onAccountToggle() {
    this.props.actions.toggle('layout', 'accountPanel');
  }

  onLogout() {
    this.props.actions.logout().then(() => {
      myHistory.push('/');
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.actions.setUIElement('eventall', 'q', this.searchQuery.value).then(() => {
      const {category, q, startDate, endDate, curPage, pageSize} = this.props.eventall;
      myHistory.push({
        pathname: '/event/all/',
        search: `?q=${q}&category=${category}&startDate=${startDate}&endDate=${endDate}&curPage=${curPage}&pageSize=${pageSize}`,
      });
    });
  }

  setPanelOff() {
    if (this.props.layout.accountPanel) {
      this.props.actions.setUIElement('layout', 'accountPanel', false);
    }
  }

  render() {
    const {accountPanel, fetching} = this.props.layout;
    const {id, type, user} = this.props.session;

    return (
      <section className="app-content box-shadow-z0" id="content" onClick={() => { this.setPanelOff(); }}> 
        {fetching && <div className="app-header navbar-md white box-shadow">
          <div className="navbar">
            <div className="container">
              <a className="navbar-item pull-right hidden-md-up m-a-0 m-l">
                <i className="fa fa-bars" aria-hidden="true" />
              </a>
              <Link className="navbar-brand" to="/">
                <img src={logImg} alt="" />
              </Link>
              <ul className="nav navbar-nav pull-right">
                {id === 0 && <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <span className="login-name">登录</span>
                  </Link> 
                </li>}
                {id === 0 && <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <span className="hidden-xs-down btn btn-sm rounded btn-outline b-danger text-u-c _600">注册</span> 
                    <span className="hidden-sm-up">
                      <Link to="/register">
                        <span className="login-register">注册</span>
                      </Link> 
                    </span>
                  </Link>
                </li>}
                {id !== 0 && <li className={classNames("nav-item dropdown", {open: accountPanel})}> 
                  <a className="nav-link dropdown-toggle clear" onClick={() => this.onAccountToggle()}>
                    <span className="avatar w-32">
                      <img src={user.avatar && user.avatar.length ? `/upload/${user.avatar}` : avatarImg} alt="" />
                    </span>
                  </a>
                  <div className="dropdown-menu pull-right dropdown-menu-scale">
                    <Link className="dropdown-item" to={`/account/${type === 1 ? 'student' : 'sponsor'}/info/`}>
                      <span>我的信息</span>
                    </Link>
                    <Link className="dropdown-item" to={`/account/${type === 1 ? 'student' : 'sponsor'}/event/`}>
                      <span>我的活动</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={() => { this.onLogout(); }} >退出登录</a>
                  </div>
                </li>}
              </ul>
              <div className="collapse navbar-toggleable-sm">
                <form className="navbar-form form-inline pull-right pull-none-sm navbar-item v-m" role="search" onSubmit={(event) => { this.onSubmit(event); }}>
                  <div className="form-group l-h m-a-0">
                    <div className="input-group">
                      <input type="text" className="form-control form-control-sm p-x b-a rounded" placeholder="搜索活动..." ref={searchQuery => { this.searchQuery = searchQuery; }} />
                    </div>
                  </div>
                </form>
                <ul className="nav navbar-nav pull-left nav-active-border b-danger m-l">
                  <li className="nav-item">
                    <Link className="nav-link" to="/event/all/">
                      <span className="nav-text text">浏览活动</span>
                    </Link>
                  </li>
                  <li className="nav-item m-l-md">
                    <a className="nav-link">
                      <span className="nav-text text">公益</span>
                    </a>
                  </li>
                  <li className="nav-item m-l-md">
                    <a className="nav-link">
                      <span className="nav-text text">资料库</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>}
        {fetching && <div className="app-body">
          {this.props.children}
        </div>}
      </section>
    );
  }
}
