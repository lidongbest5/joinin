import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Upload from 'rc-upload';
import Select from 'react-select';
import serialize from 'form-serialize';
import 'react-select/dist/react-select.css';
import * as baseActions from '../actions/base';
import {updateStudent} from '../sdk';

import avatarImg from '../images/a2.jpg';

const mapStateToProps = state => ({
  student: state.student,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    updateStudent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class accountSecurityPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const {type} = this.props.session;

    return (
      <div className="accountinfo-page">
        <div className="container">
          <div className="row-col">
            <div className="col-sm-3 col-lg-2">
              <div className="p-y-md">
                <div className="nav-active-border left b-danger">
                  <ul className="nav nav-md">
                    <li className="nav-item">
                      <Link className="nav-link block" to={type === 1 ? "/account/student/info/" : "/account/sponsor/info/"}>我的信息</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to={type === 1 ? "/account/student/event/" : "/account/sponsor/event/"}>我的活动</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block active" to="/account/security/">账号安全</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-lg-10 light lt bg-auto">
              <div className="tab-content pos-rlt">
                <div className="tab-pane active">
                  <form className="p-a-md col-md-8" ref={userForm => { this.userForm = userForm; }}>
                    <div className="form-group">
                      <label htmlFor="name">原始密码</label>
                      <input type="text" className="form-control" name="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">新密码</label>
                      <input type="text" className="form-control" name="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">重复新密码</label>
                      <input type="text" className="form-control" name="name" />
                    </div>
                    <button type="submit" className="btn btn-danger m-t">更新</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
