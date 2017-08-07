import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import classNames from 'classnames';
import md5 from 'md5';
import * as sessionActions from '../actions/session';
import * as baseActions from '../actions/base';
import {myHistory} from '../config';

import logImg from '../images/logo.png';

const mapStateToProps = state => ({
  session: state.session,
  layout: state.layout,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...sessionActions,
    ...baseActions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNav = ::this.onChangeNav;
    this.onLogin = ::this.onLogin;
  }

  componentDidMount() {

  }

  onChangeNav(type) {
    this.props.actions.setUIElement('layout', 'loginNav', type);
  }

  onLogin(event) {
    event.preventDefault();

    const data = serialize(this.loginForm, {hash: true});
    let msg = "";

    if (!data.phone) {
      msg = "请输入手机号";
    } else if (!data.password) {
      msg = "请输入密码";
    }

    if (msg.length) {
      this.props.actions.setUIElement('layout', 'loginMsg', msg);
    } else {
      data.type = this.props.layout.loginNav;
      this.props.actions.login(data).then(res => {
        const code = res.payload.code;
        if (code === 1) {
          let uri = '';
          if (data.type === 1) {
            uri = '/account/student/info/';
          } else {
            uri = '/account/sponsor/info/';
          }
          myHistory.push(uri);
        } else {
          this.props.actions.setUIElement('layout', 'loginMsg', "手机号或密码错误");
        }
      });
    }
  }

  render() {
    const {loginNav, loginMsg} = this.props.layout;

    return (
      <div className="login-page">
        <div dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" height="30" style="position:fixed; z-index:0; left:50%; top: 20%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="rgba(0,0,0,0.05)"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="10" height="10" style="position:fixed; z-index:0; left:49%; top: 15%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#a88add"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="5" height="5" style="position:fixed; z-index:0; left:30%; top: 0%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#a88add"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" style="position:fixed; z-index:0; right:5%; top: 30%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#0cc2aa"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="15" height="15" style="position:fixed; z-index:0; left:34.5%; top: 55%"><path d="M 0 48 L 24 0 L 48 48 Z" fill="#fcc100"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="200" height="200" style="position:fixed; z-index:0; right:20%; top: 70%"><path d="M 0 48 L 24 0 L 48 48 Z" fill="rgba(252,193,0,0.1)"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="120" height="120" style="position:fixed; z-index:0; left:0%; top: 30%"><path d="M 0 48 L 48 24 L 0 0 Z" fill="rgba(0,0,0,0.03)"></path></svg>'}} />
        <div className="center-block w-xxl w-auto-xs p-y-md">
          <div className="navbar">
            <div className="pull-center">
              <div className="navbar">
                <div className="pull-center">
                  <Link className="navbar-brand" to="/">
                    <img src={logImg} alt="" style={{marginLeft: "-25px"}} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
            {this.props.location.query.register === "true" && <div className="text-success m-b"><i className="fa fa fa-check-square m-r-sm" aria-hidden="true" />注册成功，请登录</div>}
            <div className="b-b b-danger nav-active-danger m-b-md">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={classNames("nav-link", {active: loginNav === 1})} onClick={() => { this.onChangeNav(1); }}>学生用户</a>
                </li>
                <li className="nav-item">
                  <a className={classNames("nav-link", {active: loginNav === 2})} onClick={() => { this.onChangeNav(2); }}>活动主办方</a>
                </li>
              </ul>
            </div>
            <div className="m-b text-sm">
              {`使用Join In${loginNav === 1 ? '学生用户' : '活动主办方'}账号登录`}
            </div>
            <form name="form" ref={loginForm => { this.loginForm = loginForm; }}>
              <div className="md-form-group">
                <input type="text" className="md-input" name="phone" />
                <label htmlFor="test">手机号</label>
              </div>
              <div className="md-form-group">
                <input type="password" className="md-input" name="password" />
                <label htmlFor="test">密码</label>
              </div>      
              <div className="m-b-md">        
                <label htmlFor="test" className="md-check">
                  <input type="checkbox" defaultChecked={true} /><i className="danger" /> 保持登录状态
                </label>
              </div>
              <div className="text-center">
                {loginMsg.length > 0 && <p className="text-danger"><i className="fa fa-exclamation-triangle m-r-sm" aria-hidden="true" />{loginMsg}</p>}
                <button type="submit" className="btn danger btn-block p-x-md" onClick={(event) => { this.onLogin(event); }}>登录</button>
              </div>
            </form>
          </div>
          <div className="p-v-lg text-center">
            <div className="m-b"><a href="forgot-password.html" className="text-danger _600">忘记密码?</a></div>
            <div>还没有Join In账号? <Link className="text-danger _600" to="/register">注册</Link></div>
          </div>
        </div>
      </div>
    );
  }
}
