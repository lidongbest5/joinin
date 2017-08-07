import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import serialize from 'form-serialize';
import moment from 'moment';
import classNames from 'classnames';
import Upload from 'rc-upload';
import Datetime from 'react-datetime';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {createEvent, getEvent, updateEvent, deleteEvent} from '../sdk';
import Event from '../components/event';
import StyleButton from '../components/StyleButton';
import * as baseActions from '../actions/base';
import * as eventActions from '../actions/event';
import {myHistory} from '../config';

import sampleImg from '../images/sample1.png';
import avatarImg from '../images/a2.jpg';

const mapStateToProps = state => ({
  session: state.session,
  event: state.event,
  layout: state.layout,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    ...eventActions,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class eventEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.img = null;
    this.handleChangeStart = ::this.handleChangeStart;
    this.handleChangeEnd = ::this.handleChangeEnd;
    this.onChange = ::this.onChange;
    this._handleKeyCommand = ::this._handleKeyCommand;
    this._onTab = ::this._onTab;
    this.toggleBlockType = ::this.toggleBlockType;
    this.toggleInlineStyle = ::this.toggleInlineStyle;
    this.getBlockStyle = ::this.getBlockStyle;
    this.focus = ::this.focus;
    this.onSubmitEvent = ::this.onSubmitEvent;
    this.onDeleteEvent = ::this.onDeleteEvent;
    this.onChangeNav = ::this.onChangeNav;
    this.addGuest = ::this.addGuest;
    this.onChangeGuestName = ::this.onChangeGuestName;
    this.onChangeGuestDesc = ::this.onChangeGuestDesc;
    this.onDeleteGuest = ::this.onDeleteGuest;
    this.onGuestUpload = ::this.onGuestUpload;
    this.addSponsor = ::this.addSponsor;
    this.onChangeSponsorName = ::this.onChangeSponsorName;
    this.onChangeSponsorDesc = ::this.onChangeSponsorDesc;
    this.onDeleteSponsor = ::this.onDeleteSponsor;
    this.onSponsorUpload = ::this.onSponsorUpload;
    this.onChangeEvent = ::this.onChangeEvent;
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.props.actions.getEvent({id: this.props.params.id}).then(() => {
        const data = this.props.event.event.fields;
        this.img = data.image;
        this.props.actions.setUIElement('event', 'startDate', moment(data.start_time));
        this.props.actions.setUIElement('event', 'endDate', moment(data.end_time));
        this.props.actions.setUIElement('event', 'guest', JSON.parse(data.guest));
        this.props.actions.setUIElement('event', 'sponsor', JSON.parse(data.sponsor));
        this.props.actions.setUIElement('event', 'editorState', EditorState.createWithContent(stateFromHTML(data.process)));
        this.props.actions.setUIElement('event', 'eventFetch', true);
      });
    } else {
      this.props.actions.setUIElement('event', 'eventFetch', true);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetEvent();
  }

  onChange(value) {
    this.props.actions.setUIElement('event', 'editorState', value);
  }

  onChangeNav(type) {
    this.props.actions.setUIElement('event', 'eventNav', type);
  }

  onChangeEvent(e, type) {
    const {event} = this.props.event;
    if (type === 1) {
      event.fields.title = e.target.value;
    } else if (type === 2) {
      event.fields.place = e.target.value;
    } else if (type === 3) {
      event.fields.category = e.target.value;
    }

    this.props.actions.setUIElement('event', 'event', event);
  }

  onSubmitEvent(e) {
    e.preventDefault();

    const data = serialize(this.eventForm, {hash: true});
    const {startDate, endDate, editorState, guest, sponsor, event} = this.props.event;
    let msg = "";

    if (!event.fields.title) {
      msg = "请输入活动名称";
    } else if (!startDate) {
      msg = "请选择活动开始时间";
    } else if (!endDate) {
      msg = "请选择活动结束时间";
    } else if (!event.fields.place) {
      msg = "请输入活动地点";
    } else if (!event.fields.category || event.fields.category === '0') {
      msg = "请选择活动类型";
    }

    if (msg.length) {
      this.props.actions.setUIElement('event', 'eventMsg', msg);
    } else {
      data.title = event.fields.title;
      data.place = event.fields.place;
      data.category = event.fields.category;
      data.start_time = moment(startDate).format('YYYY-MM-DD HH:mm');
      data.end_time = moment(endDate).format('YYYY-MM-DD HH:mm');
      data.process = stateToHTML(editorState.getCurrentContent());
      data.image = this.img || null;
      data.guest = JSON.stringify(guest);
      data.sponsor = JSON.stringify(sponsor);

      if (this.props.params.id) {
        data.id = this.props.params.id;
        this.props.actions.updateEvent(data).then(res => {
          this.props.actions.setUIElement('event', 'updateMsg', res.payload.msg);
          setTimeout(() => {
            this.props.actions.setUIElement('event', 'updateMsg', '');
          }, 3000);
        });
      } else {
        this.props.actions.createEvent(data).then(res => {
          myHistory.push('/account/sponsor/event/');
        });
      }
    }
  }

  onDeleteEvent(event) {
    event.preventDefault();
    if (window.confirm('确定删除这个活动么?')) {
      this.props.actions.deleteEvent({
        id: this.props.params.id,
      }).then(res => {
        myHistory.push('/account/sponsor/event/');
      });
    }
  }

  onChangeGuestName(e, index) {
    const {guest} = this.props.event;

    guest[index].name = e.target.value;
    this.props.actions.setUIElement('event', 'guest', guest);
  }

  onChangeGuestDesc(e, index) {
    const {guest} = this.props.event;

    guest[index].desc = e.target.value;
    this.props.actions.setUIElement('event', 'guest', guest);
  }

  onDeleteGuest(index) {
    const {guest} = this.props.event;
    guest.splice(index, 1);
    this.props.actions.setUIElement('event', 'guest', guest);
  }

  onGuestUpload(result) {
    const {guest} = this.props.event;
    guest[parseInt(result.id, 10)].img = result.name;
    this.props.actions.setUIElement('event', 'guest', guest);
  }

  onChangeSponsorName(e, index) {
    const {sponsor} = this.props.event;

    sponsor[index].name = e.target.value;
    this.props.actions.setUIElement('event', 'sponsor', sponsor);
  }

  onChangeSponsorDesc(e, index) {
    const {sponsor} = this.props.event;

    sponsor[index].desc = e.target.value;
    this.props.actions.setUIElement('event', 'sponsor', sponsor);
  }

  onDeleteSponsor(index) {
    const {sponsor} = this.props.event;
    sponsor.splice(index, 1);
    this.props.actions.setUIElement('event', 'sponsor', sponsor);
  }

  onSponsorUpload(result) {
    const {sponsor} = this.props.event;
    sponsor[parseInt(result.id, 10)].img = result.name;
    this.props.actions.setUIElement('event', 'sponsor', sponsor);
  }

  handleChangeStart(data) {
    this.props.actions.setUIElement('event', 'startDate', data);
  }

  handleChangeEnd(data) {
    this.props.actions.setUIElement('event', 'endDate', data);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.props.event;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.props.event.editorState, maxDepth));
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.event.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.event.editorState,
        inlineStyle
      )
    );
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  focus() {
    this.editor.focus();
  }

  addGuest() {
    const {guest} = this.props.event; 
    guest.push({
      name: '',
      img: '',
      desc: '',
    });
    this.props.actions.setUIElement('event', 'guest', guest);
  }

  addSponsor() {
    const {sponsor} = this.props.event; 
    sponsor.push({
      name: '',
      img: '',
      desc: '',
    });
    this.props.actions.setUIElement('event', 'sponsor', sponsor);
  }

  render() {
    const {event, eventFetch, startDate, endDate, editorState, eventMsg, updateMsg, guest, sponsor, eventNav} = this.props.event;
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
      onSuccess(result, file) {
        that.img = `${result.name}`;
        event.fields.image = `${result.name}`;
        that.props.actions.setUIElement('layout', 'uploadMsg', '');
        that.props.actions.setUIElement('event', 'event', event);
      },
    };

    const uploaderGuestProps = {
      action: '/api/upload/',
      multiple: false,
      beforeUpload(file) {
        // console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        // console.log('onStart', file.name);
        that.props.actions.setUIElement('layout', 'uploadMsg', '上传中...');
      },
      onSuccess(result, file) {
        that.onGuestUpload(result);
        that.props.actions.setUIElement('layout', 'uploadMsg', '');
      },
    };

    const uploaderSponsorProps = {
      action: '/api/upload/',
      multiple: false,
      beforeUpload(file) {
        // console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        // console.log('onStart', file.name);
        that.props.actions.setUIElement('layout', 'uploadMsg', '上传中...');
      },
      onSuccess(result, file) {
        that.onSponsorUpload(result);
        that.props.actions.setUIElement('layout', 'uploadMsg', '');
      },
    };

    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const styleMap = {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };

    const BLOCK_TYPES = [
      {label: 'H1', style: 'header-one'},
      {label: 'H2', style: 'header-two'},
      {label: 'H3', style: 'header-three'},
      {label: 'H4', style: 'header-four'},
      {label: 'H5', style: 'header-five'},
      {label: 'H6', style: 'header-six'},
      {label: 'Blockquote', style: 'blockquote'},
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'},
      {label: 'Code Block', style: 'code-block'},
    ];

    const BlockStyleControls = (props) => {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return (
        <div className="RichEditor-controls">
          {BLOCK_TYPES.map((type) =>
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    const INLINE_STYLES = [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
      {label: 'Monospace', style: 'CODE'},
    ];
    const InlineStyleControls = (props) => {
      const currentStyle = props.editorState.getCurrentInlineStyle();
      return (
        <div className="RichEditor-controls">
          {INLINE_STYLES.map(type =>
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    return (
      <div className="accountinfo-page">
        {eventFetch && <div className="container">
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
                <div className="tab-pane active">
                  <div className="p-a-md dker _600">{this.props.params.id ? `编辑活动` : '新建活动'}</div>
                  <div className="nav-active-border b-danger bottom">
                    <div className="nav nav-md">
                      <a className={classNames("nav-link", {active: eventNav === 1})} onClick={() => { this.onChangeNav(1); }}>基本信息</a>
                      <a className={classNames("nav-link", {active: eventNav === 2})} onClick={() => { this.onChangeNav(2); }}>活动嘉宾</a>
                      <a className={classNames("nav-link", {active: eventNav === 3})} onClick={() => { this.onChangeNav(3); }}>活动赞助商</a>
                    </div>
                  </div>
                  <div className="p-a-md col-md-8">
                    {eventNav === 1 && <form ref={eventForm => { this.eventForm = eventForm; }}>
                      <div className="form-group">
                        <label htmlFor="name">活动名称</label>
                        <input type="text" className="form-control" name="title" value={event.fields.title} onChange={(e) => { this.onChangeEvent(e, 1); }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">活动开始时间</label>
                        <Datetime
                            value={startDate}
                            onChange={this.handleChangeStart}
                            locale="zh-cn"
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm"
                            placeholder="请选择活动开始时间"
                            name="start_time"
                          />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">活动结束时间</label>
                        <Datetime
                            value={endDate}
                            onChange={this.handleChangeEnd}
                            locale="zh-cn"
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm"
                            placeholder="请选择活动结束时间"
                            name="end_time"
                          />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">活动地点</label>
                        <input type="text" className="form-control" name="place" value={event.fields.place} onChange={(e) => { this.onChangeEvent(e, 2); }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">活动横幅图片</label>
                        <div>
                          <div className="banner-img m-b">
                            <img src={event.fields.image ? `/upload/${event.fields.image}` : sampleImg} alt="" />
                          </div>
                          <Upload {...uploaderProps} component="div" style={{ display: 'inline-block' }}><button type="button" className="btn btn-sm btn-danger">上传图片</button></Upload> 
                          {uploadMsg.length > 0 && <span className="m-l"><i className="fa fa-spinner fa-pulse fa-fw" />上传中...</span>}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="sex">活动类型</label>
                        <select className="form-control input-c" name="category" value={event.fields.category} onChange={(e) => { this.onChangeEvent(e, 3); }}>
                          <option value="0">请选择</option>
                          <option value="创业">创业</option>
                          <option value="公益">公益</option>
                          <option value="科技">科技</option>
                          <option value="运动">运动</option>
                          <option value="互联网">互联网</option>
                          <option value="教育">教育</option>
                          <option value="职场">职场</option>
                          <option value="健康">健康</option>
                          <option value="文艺">文艺</option>
                          <option value="心理">心理</option>
                          <option value="户外">户外</option>
                          <option value="金融">金融</option>
                          <option value="旅行">旅行</option>
                          <option value="读书">读书</option>
                          <option value="电商">电商</option>
                          <option value="时尚">时尚</option>
                          <option value="设计">设计</option>
                          <option value="游戏">游戏</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">活动介绍</label>
                        <div className="RichEditor-root">
                          <BlockStyleControls
                            editorState={editorState}
                            onToggle={this.toggleBlockType}
                          />
                          <InlineStyleControls
                            editorState={editorState}
                            onToggle={this.toggleInlineStyle}
                          />
                          <div className={className} onClick={this.focus}>
                            <Editor
                              blockStyleFn={this.getBlockStyle}
                              customStyleMap={styleMap}
                              editorState={editorState}
                              handleKeyCommand={this.handleKeyCommand}
                              onChange={this.onChange}
                              onTab={this.onTab}
                              placeholder="介绍一下活动吧..."
                              ref={editor => { this.editor = editor; }}
                              spellCheck={true}
                            />
                          </div>
                        </div>
                      </div>
                    </form>}
                    {eventNav === 2 && <div className="form-group">
                      {guest.length > 0 && guest.map((item, index) => {
                        return (
                          <div className="guest-item pos-rlt m-b-md">
                            <form>
                              <button type="button" className="btn btn-sm btn-danger guest-item-close"><i className="fa fa-times" onClick={() => { this.onDeleteGuest(index); }} /></button>
                              <div className="form-group row">
                                <label htmlFor="test" className="col-sm-2 form-control-label">姓名</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" value={item.name} onChange={(e) => { this.onChangeGuestName(e, index); }} />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 form-control-label">图片</label>
                                <div className="col-sm-10">
                                  <span className="avatar w-56 m-r">
                                    <img src={item.img.length > 0 ? `/upload/${item.img}` : avatarImg} alt="" />
                                  </span>
                                  <Upload {...uploaderGuestProps} data={{id: index}} component="div" style={{ display: 'inline-block' }}><button type="button" className="btn btn-sm btn-danger">上传图片</button></Upload> 
                                  {uploadMsg.length > 0 && <span className="m-l"><i className="fa fa-spinner fa-pulse fa-fw" />上传中...</span>}
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="test" className="col-sm-2 form-control-label">简介</label>
                                <div className="col-sm-10">
                                  <textarea className="form-control" rows="2" value={item.desc} onChange={(e) => { this.onChangeGuestDesc(e, index); }}></textarea>
                                </div>
                              </div>
                            </form>
                          </div>
                        );
                      })}
                      <div>
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => { this.addGuest(); }}>
                          <i className="fa fa-plus pull-left" />
                          添加嘉宾
                        </button>
                      </div>
                    </div>}
                    {eventNav === 3 && <div className="form-group">
                      {sponsor.length > 0 && sponsor.map((item, index) => {
                        return (
                          <div className="sponsor-item pos-rlt m-b-md">
                            <form>
                              <button type="button" className="btn btn-sm btn-danger guest-item-close"><i className="fa fa-times" onClick={() => { this.onDeleteSponsor(index); }} /></button>
                              <div className="form-group row">
                                <label htmlFor="test" className="col-sm-2 form-control-label">名称</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" value={item.name} onChange={(e) => { this.onChangeSponsorName(e, index); }} />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 form-control-label">图片</label>
                                <div className="col-sm-10">
                                  <span className="m-r">
                                    <img style={{maxHeight: '100px'}} src={item.img.length > 0 ? `/upload/${item.img}` : avatarImg} alt="" />
                                  </span>
                                  <Upload {...uploaderSponsorProps} data={{id: index}} component="div" style={{ display: 'inline-block' }}><button type="button" className="btn btn-sm btn-danger">上传图片</button></Upload> 
                                  {uploadMsg.length > 0 && <span className="m-l"><i className="fa fa-spinner fa-pulse fa-fw" />上传中...</span>}
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="test" className="col-sm-2 form-control-label">简介</label>
                                <div className="col-sm-10">
                                  <textarea className="form-control" rows="2" value={item.desc} onChange={(e) => { this.onChangeSponsorDesc(e, index); }}></textarea>
                                </div>
                              </div>
                            </form>
                          </div>
                        );
                      })}
                      <div>
                        <button className="btn btn-sm btn-danger" onClick={() => { this.addSponsor(); }}>
                          <i className="fa fa-plus pull-left" />
                          添加赞助商
                        </button>
                      </div>
                    </div>}
                    {eventMsg.length > 0 && <p className="text-danger"><i className="fa fa-exclamation-triangle m-r-sm" aria-hidden="true" />{eventMsg}</p>}
                    {updateMsg.length > 0 && <div className="text-success"><i className="fa fa fa-check-square m-r-sm" aria-hidden="true" />{updateMsg}</div>}
                    <button type="submit" className="btn btn-danger m-t" onClick={(e) => { this.onSubmitEvent(e); }}>确定</button>
                    {this.props.params.id && <button type="button" className="btn btn-light m-t m-l" onClick={(e) => { this.onDeleteEvent(e); }}>删除</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}
