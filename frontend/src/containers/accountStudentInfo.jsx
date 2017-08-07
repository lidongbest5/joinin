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
  layout: state.layout,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    updateStudent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class accountStudentInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUniversityValue = ::this.onChangeUniversityValue;
    this.onChangeMajorValue = ::this.onChangeMajorValue;
    this.onSubmit = ::this.onSubmit;
    this.avatar = null;
  }

  componentDidMount() {
    const school = this.props.session.user.school;
    const major = this.props.session.user.major;
    if (school) {
      this.props.actions.setUIElement('student', 'universityValue', {
        value: school,
        label: school,
      });
    }
    if (major) {
      this.props.actions.setUIElement('student', 'majorValue', {
        value: major,
        label: major,
      });
    }
  }

  onChangeUniversityValue(value) {
    this.props.actions.setUIElement('student', 'universityValue', value);
  }

  onChangeMajorValue(value) {
    this.props.actions.setUIElement('student', 'majorValue', value);
  }

  onSubmit(event) {
    event.preventDefault();

    const data = serialize(this.userForm, {hash: true});
    const universityValue = this.props.student.universityValue;
    const majorValue = this.props.student.majorValue;

    if (data.label) {
      data.label = data.label.join(',');
    }
    if (this.avatar) {
      data.avatar = this.avatar;
    }
    if (universityValue.value) {
      data.school = universityValue.value;
    }
    if (majorValue.value) {
      data.major = majorValue.value;
    }

    const userData = Object.assign(this.props.session.user, data);

    this.props.actions.updateStudent(userData).then(res => {
      this.props.actions.setUIElement('session', 'user', userData);
      this.props.actions.setUIElement('student', 'updateMsg', res.payload.msg);
      setTimeout(() => {
        this.props.actions.setUIElement('student', 'updateMsg', '');
      }, 3000);
    });
  }

  render() {
    const {universityValue, majorValue, updateMsg} = this.props.student;
    const {user} = this.props.session;
    const {uploadMsg} = this.props.layout;

    const universityOptions = [{value: "北京大学", label: "北京大学"}, {value: "中国人民大学", label: "中国人民大学"}, {value: "清华大学", label: "清华大学"}, {value: "北京交通大学", label: "北京交通大学"}, {value: "北京工业大学", label: "北京工业大学"}, {value: "北京航空航天大学", label: "北京航空航天大学"}, {value: "北京理工大学", label: "北京理工大学"}, {value: "北京科技大学", label: "北京科技大学"}, {value: "北方工业大学", label: "北方工业大学"}, {value: "北京化工大学", label: "北京化工大学"}, {value: "北京服装学院", label: "北京服装学院"}, {value: "北京邮电大学", label: "北京邮电大学"}, {value: "北京印刷学院", label: "北京印刷学院"}, {value: "北京建筑大学", label: "北京建筑大学"}, {value: "北京石油化工学院", label: "北京石油化工学院"}, {value: "北京电子科技学院", label: "北京电子科技学院"}, {value: "中国农业大学", label: "中国农业大学"}, {value: "北京农学院", label: "北京农学院"}, {value: "北京林业大学", label: "北京林业大学"}, {value: "北京协和医学院", label: "北京协和医学院"}, {value: "首都医科大学", label: "首都医科大学"}, {value: "北京中医药大学", label: "北京中医药大学"}, {value: "北京师范大学", label: "北京师范大学"}, {value: "首都师范大学", label: "首都师范大学"}, {value: "首都体育学院", label: "首都体育学院"}, {value: "北京外国语大学", label: "北京外国语大学"}, {value: "北京第二外国语学院", label: "北京第二外国语学院"}, {value: "北京语言大学", label: "北京语言大学"}, {value: "中央财经大学", label: "中央财经大学"}, {value: "对外经济贸易大学", label: "对外经济贸易大学"}, {value: "北京物资学院", label: "北京物资学院"}, {value: "外交学院", label: "外交学院"}, {value: "中国人民公安大学", label: "中国人民公安大学"}, {value: "国际关系学院", label: "国际关系学院"}, {value: "北京体育大学", label: "北京体育大学"}, {value: "中央音乐学院", label: "中央音乐学院"}, {value: "中国音乐学院", label: "中国音乐学院"}, {value: "中央美术学院", label: "中央美术学院"}, {value: "中央戏剧学院", label: "中央戏剧学院"}, {value: "中国戏曲学院", label: "中国戏曲学院"}, {value: "北京电影学院", label: "北京电影学院"}, {value: "北京舞蹈学院", label: "北京舞蹈学院"}, {value: "中央民族大学", label: "中央民族大学"}, {value: "中国政法大学", label: "中国政法大学"}, {value: "华北电力大学", label: "华北电力大学"}, {value: "北京信息科技大学", label: "北京信息科技大学"}, {value: "中国矿业大学(北京)", label: "中国矿业大学(北京)"}, {value: "中国地质大学(北京)", label: "中国地质大学(北京)"}, {value: "北京联合大学", label: "北京联合大学"}, {value: "北京城市学院", label: "北京城市学院"}, {value: "中国青年政治学院", label: "中国青年政治学院"}, {value: "北京青年政治学院", label: "北京青年政治学院"}, {value: "首钢工学院", label: "首钢工学院"}, {value: "首都经济贸易大学", label: "首都经济贸易大学"}, {value: "北京工商大学", label: "北京工商大学"}, {value: "中华女子学院", label: "中华女子学院"}, {value: "北京工业职业技术学院", label: "北京工业职业技术学院"}, {value: "北京信息职业技术学院", label: "北京信息职业技术学院"}, {value: "北京电子科技职业学院", label: "北京电子科技职业学院"}, {value: "北京科技经营管理学院", label: "北京科技经营管理学院"}, {value: "北京吉利学院", label: "北京吉利学院"}, {value: "北京农业职业学院", label: "北京农业职业学院"}, {value: "北京戏曲艺术职业学院", label: "北京戏曲艺术职业学院"}, {value: "北京京北职业技术学院", label: "北京京北职业技术学院"}, {value: "北京经贸职业学院", label: "北京经贸职业学院"}, {value: "北京经济技术职业学院", label: "北京经济技术职业学院"}, {value: "北京财贸职业学院", label: "北京财贸职业学院"}, {value: "北京警察学院", label: "北京警察学院"}, {value: "北京经济管理职业学院", label: "北京经济管理职业学院"}, {value: "北京政法职业学院", label: "北京政法职业学院"}, {value: "中国工程物理研究院职工工学院", label: "中国工程物理研究院职工工学院"}, {value: "北京劳动保障职业学院", label: "北京劳动保障职业学院"}, {value: "北京社会管理职业学院", label: "北京社会管理职业学院"}, {value: "北京大学医学部", label: "北京大学医学部"}, {value: "北京工商大学嘉华学院", label: "北京工商大学嘉华学院"}, {value: "北京工业大学耿丹学院", label: "北京工业大学耿丹学院"}, {value: "北京汇佳职业学院", label: "北京汇佳职业学院"}, {value: "北京交通职业技术学院", label: "北京交通职业技术学院"}, {value: "北京科技职业学院", label: "北京科技职业学院"}, {value: "北京培黎职业学院", label: "北京培黎职业学院"}, {value: "北京邮电大学世纪学院", label: "北京邮电大学世纪学院"}, {value: "首都师范大学科德学院", label: "首都师范大学科德学院"}, {value: "中国传媒大学", label: "中国传媒大学"}, {value: "中国劳动关系学院", label: "中国劳动关系学院"}, {value: "中国石油大学(北京)", label: "中国石油大学(北京)"}, {value: "北京第二外国语学院中瑞酒店管理学院", label: "北京第二外国语学院中瑞酒店管理学院"}, {value: "北京交通运输职业学院", label: "北京交通运输职业学院"}, {value: "北京艺术传媒职业学院", label: "北京艺术传媒职业学院"}, {value: "北京体育职业学院", label: "北京体育职业学院"}, {value: "北京电影学院现代创意媒体学院", label: "北京电影学院现代创意媒体学院"}];

    const majorOptions = [{value: "哲学", label: "哲学"}, {value: "经济学", label: "经济学"}, {value: "财政学", label: "财政学"}, {value: "金融学", label: "金融学"}, {value: "经济与贸易", label: "经济与贸易"}, {value: "法学", label: "法学"}, {value: "社会学", label: "社会学"}, {value: "政治学", label: "政治学"}, {value: "公安学", label: "公安学"}, {value: "民族学", label: "民族学"}, {value: "马克思主义理论", label: "马克思主义理论"}, {value: "教育学", label: "教育学"}, {value: "体育学", label: "体育学"}, {value: "中国语言文学", label: "中国语言文学"}, {value: "外国语言文学", label: "外国语言文学"}, {value: "新闻传播学", label: "新闻传播学"}, {value: "历史学", label: "历史学"}, {value: "数学", label: "数学"}, {value: "物理学", label: "物理学"}, {value: "化学", label: "化学"}, {value: "生物科学", label: "生物科学"}, {value: "地质学", label: "地质学"}, {value: "地理科学", label: "地理科学"}, {value: "地球物理学", label: "地球物理学"}, {value: "大气科学", label: "大气科学"}, {value: "海洋科学", label: "海洋科学"}, {value: "心理学", label: "心理学"}, {value: "统计学", label: "统计学"}, {value: "天文学", label: "天文学"}, {value: "材料", label: "材料"}, {value: "机械", label: "机械"}, {value: "能源动力", label: "能源动力"}, {value: "水利", label: "水利"}, {value: "测绘", label: "测绘"}, {value: "化工与制药", label: "化工与制药"}, {value: "交通运输", label: "交通运输"}, {value: "海洋工程", label: "海洋工程"}, {value: "航空航天", label: "航空航天"}, {value: "生物工程", label: "生物工程"}, {value: "农业工程", label: "农业工程"}, {value: "力学", label: "力学"}, {value: "仪器", label: "仪器"}, {value: "电气", label: "电气"}, {value: "电子信息", label: "电子信息"}, {value: "自动化", label: "自动化"}, {value: "计算机", label: "计算机"}, {value: "土木", label: "土木"}, {value: "地质", label: "地质"}, {value: "矿业", label: "矿业"}, {value: "纺织", label: "纺织"}, {value: "轻工", label: "轻工"}, {value: "兵器", label: "兵器"}, {value: "核工程", label: "核工程"}, {value: "林业工程", label: "林业工程"}, {value: "环境科学与工程", label: "环境科学与工程"}, {value: "生物医学工程", label: "生物医学工程"}, {value: "食品科学与工程", label: "食品科学与工程"}, {value: "建筑", label: "建筑"}, {value: "安全科学与工程", label: "安全科学与工程"}, {value: "公安技术", label: "公安技术"}, {value: "植物生产", label: "植物生产"}, {value: "动物生产", label: "动物生产"}, {value: "动物医学", label: "动物医学"}, {value: "自然保护与环境生态", label: "自然保护与环境生态"}, {value: "林学", label: "林学"}, {value: "水产", label: "水产"}, {value: "草学", label: "草学"}, {value: "基础医学", label: "基础医学"}, {value: "口腔医学", label: "口腔医学"}, {value: "中医学", label: "中医学"}, {value: "护理学", label: "护理学"}, {value: "药学", label: "药学"}, {value: "临床医学", label: "临床医学"}, {value: "公共卫生与预防医学", label: "公共卫生与预防医学"}, {value: "中西医结合", label: "中西医结合"}, {value: "中药学", label: "中药学"}, {value: "法医学", label: "法医学"}, {value: "医学技术", label: "医学技术"}, {value: "管理科学与工程", label: "管理科学与工程"}, {value: "工商管理", label: "工商管理"}, {value: "公共管理", label: "公共管理"}, {value: "农业经济管理", label: "农业经济管理"}, {value: "图书情报与档案管理", label: "图书情报与档案管理"}, {value: "物流管理与工程", label: "物流管理与工程"}, {value: "工业工程", label: "工业工程"}, {value: "电子商务", label: "电子商务"}, {value: "旅游管理", label: "旅游管理"}, {value: "艺术学理论", label: "艺术学理论"}, {value: "音乐与舞蹈学", label: "音乐与舞蹈学"}, {value: "戏剧与影视学", label: "戏剧与影视学"}, {value: "美术学", label: "美术学"}, {value: "设计学", label: "设计学"}];

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
                      <Link className="nav-link block active" to="/account/student/info/">我的信息</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link block" to="/account/student/event/">我的活动</Link>
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
                      <label htmlFor="name">姓名</label>
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
                      <label htmlFor="sex">性别</label>
                      <select className="form-control input-c" name="sex" defaultValue={user.sex}>
                        <option value="0">请选择</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="university">大学</label>
                      <Select options={universityOptions} value={universityValue} onChange={this.onChangeUniversityValue} placeholder="请输入并选择大学" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="major">专业</label>
                      <Select options={majorOptions} value={majorValue} onChange={this.onChangeMajorValue} placeholder="请输入并选择专业" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="degree">在读学历</label>
                      <select className="form-control input-c" name="degree" defaultValue={user.degree}>
                        <option value="0">请选择</option>
                        <option value="1">本科</option>
                        <option value="2">研究生</option>
                        <option value="3">博士</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="school_time">入学时间</label>
                      <select className="form-control input-c" name="school_time" defaultValue={user.school_time}>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tag">兴趣标签</label>
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
                      <label htmlFor="intro">个性签名</label>
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
