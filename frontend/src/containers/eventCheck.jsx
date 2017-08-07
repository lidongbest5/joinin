import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Event from '../components/event';
import * as baseActions from '../actions/base';
import {getCheck, setCheck} from '../sdk';

const mapStateToProps = state => ({
  session: state.session,
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getCheck,
    setCheck,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class eventCheckPage extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleCheck = ::this.onToggleCheck;
  }

  componentDidMount() {
    this.props.actions.getCheck({
      id: this.props.params.id,
    });
  }

  onToggleCheck(id) {
    const data = this.props.event.checkList;
    data.forEach(item => {
      if (item.id === id) {
        item.status = item.status ? 0 : 1;
        this.props.actions.setCheck({
          id: id,
          status: item.status,
        });
      }
    });
    this.props.actions.setUIElement('event', 'checkList', data);
  }

  render() {
    const {checkList, checkFetch} = this.props.event;

    return (
      <div className="accountevent-page">
        <div className="container">
          <div className="row-col">
            <div className="col-sm-3 col-lg-2">
              <div className="p-y-md">
                <div className="nav-active-border left b-danger">
                  <ul className="nav nav-md">
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/sponsor/info/">我的信息</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block active" to="/account/sponsor/event/">我的活动</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to="/">账号安全</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-lg-10 light lt bg-auto">
              <div className="tab-content pos-rlt">
                <div className="tab-pane p-a-md active">
                  {checkList.length === 0 && checkFetch && <div className="text-center">暂无数据</div>}
                  {checkList.length > 0 && <div className="table-responsive">
                    <div className="table-con">
                      <table className="table dataTable no-footer table-bordered table-hover">
                        <thead>
                          <th>学生名字</th>
                          <th>学生学校</th>
                          <th>学生专业</th>
                          <th>报名时间</th>
                          <th>报名理由</th>
                          <th>操作</th>
                        </thead>
                        <tbody>  
                          {checkList.map((item, index) => {
                            return (
                              <tr>
                                <td>{item.username}</td>
                                <td>{item.school}</td>
                                <td>{item.major}</td>
                                <td>{moment(item.date_joined).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{item.invite_reason}</td>
                                <td>
                                  <label className="ui-switch" htmlFor="has-value" onClick={() => { this.onToggleCheck(item.id); }}>
                                    <input type="checkbox" checked={item.status} className="has-value" />
                                    <i />
                                  </label>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
