import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import {getStudentEvent} from '../sdk';
import * as baseActions from '../actions/base';
import Event from '../components/event';

const mapStateToProps = state => ({
  student: state.student,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getStudentEvent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class accountStudentEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNav = ::this.onChangeNav;
  }

  componentDidMount() {
    this.props.actions.getStudentEvent();
  }

  onChangeNav(type) {
    this.props.actions.setUIElement('student', 'nav', type);
  }

  render() {
    const {nav, eventsAll, listFetch} = this.props.student;
    let list = [];
    if (nav === 1) {
      list = eventsAll.filter(item => {
        return item.checkin === 0 && item.status === 0;
      });
    } else if (nav === 2) {
      list = eventsAll.filter(item => {
        return item.checkin === 0 && item.status === 1;
      });
    } else if (nav === 3) {
      list = eventsAll.filter(item => {
        return item.checkin === 1;
      });
    }

    return (
      <div className="accountevent-page">
        <div className="container">
          <div className="row-col">
            <div className="col-sm-3 col-lg-2">
              <div className="p-y-md">
                <div className="nav-active-border left b-danger">
                  <ul className="nav nav-md">
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/student/info/">我的信息</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block active" to="/account/student/event/">我的活动</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/security/">账号安全</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-lg-10 light lt bg-auto">
              <div className="tab-content pos-rlt">
                <div className="tab-pane p-a-md active">
                  <div className="b-b b-danger nav-active-danger m-b-md">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a className={classNames("nav-link", {active: nav === 1})} onClick={() => { this.onChangeNav(1); }}>已报名待审核活动</a>
                      </li>
                      <li className="nav-item">
                        <a className={classNames("nav-link", {active: nav === 2})} onClick={() => { this.onChangeNav(2); }}>已报名通过审核活动</a>
                      </li>
                      <li className="nav-item">
                        <a className={classNames("nav-link", {active: nav === 3})} onClick={() => { this.onChangeNav(3); }}>已参加活动</a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    {listFetch && list.length === 0 && <div className="text-center">暂无活动</div>}
                    {list.length > 0 && list.map((item, index) => {
                      return (
                        <Event data={JSON.parse(item.event)[0]} type={1} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
