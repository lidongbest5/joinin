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
import {updateSponsor} from '../sdk';

import avatarImg from '../images/a2.jpg';

const mapStateToProps = state => ({
  student: state.student,
  session: state.session,
  layout: state.layout,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    updateSponsor,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class accountSponsorInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = ::this.onSubmit;
    this.avatar = null;
  }

  componentDidMount() {

  }

  onSubmit(event) {
    event.preventDefault();

    const data = serialize(this.userForm, {hash: true});

    if (data.label) {
      data.label = data.label.join(',');
    }
    if (this.avatar) {
      data.avatar = this.avatar;
    }

    const userData = Object.assign(this.props.session.user, data);

    this.props.actions.updateSponsor(userData).then(res => {
      this.props.actions.setUIElement('session', 'user', userData);
      this.props.actions.setUIElement('student', 'updateMsg', res.payload.msg);
      setTimeout(() => {
        this.props.actions.setUIElement('student', 'updateMsg', '');
      }, 3000);
    });
  }

  render() {
    const {updateMsg} = this.props.student;
    const {user} = this.props.session;
    const {uploadMsg} = this.props.layout;

    const that = this;

    const uploaderProps = {
      action: '/api/upload/',
      multiple: false,
      beforeUpload(file) {
        // console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        // console.log('onStart', file.name);
        that.props.actions.setUIElement('layout', 'uploadMsg', '上传中...');
      },
      onSuccess(file) {
        that.avatar = `m_${file.name}`;
        user.avatar = `m_${file.name}`;
        that.props.actions.setUIElement('layout', 'uploadMsg', '');
        that.props.actions.setUIElement('session', 'user', user);
      },
    };

    return (
      <div className="accountinfo-page">
        <div className="container">
          <div className="row-col">
            <div className="col-sm-3 col-lg-2">
              <div className="p-y-md">
                <div className="nav-active-border left b-danger">
                  <ul className="nav nav-md">
                    <li className="nav-item">
                      <Link className="nav-link block active" to="/account/sponsor/info/">我的信息</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/sponsor/event/">我的活动</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/sponsor/statistics/">我的统计</Link>
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
                <div className="tab-pane active">
                  <form className="p-a-md col-md-8" ref={userForm => { this.userForm = userForm; }}>
                    <div className="form-group">
                      <label htmlFor="name">名称</label>
                      <input type="text" className="form-control" name="name" defaultValue={user.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">头像</label>
                      <div>
                        <span className="avatar w-56 m-r">
                          <img src={user.avatar !== null ? `/upload/${user.avatar}` : avatarImg} alt="" />
                        </span>
                        <Upload {...uploaderProps} component="div" style={{ display: 'inline-block' }}><button type="button" className="btn btn-sm btn-danger">上传头像</button></Upload> 
                        {uploadMsg.length > 0 && <span className="m-l"><i className="fa fa-spinner fa-pulse fa-fw" />上传中...</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">邮箱</label>
                      <input type="email" className="form-control" name="email" defaultValue={user.email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tag">标签</label>
                      <div>
                        <label className="checkbox-inline m-r" htmlFor="tag1">
                          <input type="checkbox" value="创业" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('创业') !== -1} /> 创业
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="公益" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('公益') !== -1} /> 公益
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="科技" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('科技') !== -1} /> 科技
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="运动" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('运动') !== -1} /> 运动
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="互联网" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('互联网') !== -1} /> 互联网
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="教育" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('教育') !== -1} /> 教育
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="职场" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('职场') !== -1} /> 职场
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="健康" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('健康') !== -1} /> 健康
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="文艺" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('文艺') !== -1} /> 文艺
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="心理" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('心理') !== -1} /> 心理
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="户外" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('户外') !== -1} /> 户外
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="金融" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('金融') !== -1} /> 金融
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="旅行" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('旅行') !== -1} /> 旅行
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="读书" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('读书') !== -1} /> 读书
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="电商" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('电商') !== -1} /> 电商
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="时尚" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('时尚') !== -1} /> 时尚
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="设计" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('设计') !== -1} /> 设计
                        </label>
                        <label className="checkbox-inline m-r" htmlFor="tag2">
                          <input type="checkbox" value="游戏" className="has-value" name="label" defaultChecked={user.label && user.label.indexOf('游戏') !== -1} /> 游戏
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="wechat">微信</label>
                      <input type="text" className="form-control" name="wechat" defaultValue={user.wechat} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weibo">微博</label>
                      <input type="text" className="form-control" name="weibo" defaultValue={user.weibo} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="intro">简介</label>
                      <input type="text" className="form-control" name="intro" defaultValue={user.intro} />
                    </div>
                    {updateMsg.length > 0 && <div className="text-success"><i className="fa fa fa-check-square m-r-sm" aria-hidden="true" />{updateMsg}</div>}
                    <button type="submit" className="btn btn-danger m-t" onClick={(event) => { this.onSubmit(event); }}>更新</button>
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
