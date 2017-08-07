import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';
import * as baseActions from '../actions/base';
import {getEvent, registerEvent, getMembership} from '../sdk';
import Event from '../components/event';

import sample1 from '../images/sample1.png';
import closeImg from '../images/close.png';
import avatarImg from '../images/a2.jpg';

const mapStateToProps = state => ({
  event: state.event,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getEvent,
    registerEvent,
    getMembership,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class eventViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = ::this.showModal;
    this.closeModal = ::this.closeModal;
    this.onSubmit = ::this.onSubmit;
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.actions.getEvent({id: this.props.params.id});
    this.props.actions.getMembership({id: this.props.params.id});
  }

  onSubmit() {
    this.props.actions.registerEvent({
      id: this.props.params.id,
      msg: this.editor.value,
    }).then(res => {
      this.closeModal();
    });
  }

  showModal() {
    this.props.actions.setUIElement('event', 'showModal', true);
  }

  closeModal() {
    this.props.actions.setUIElement('event', 'showModal', false);
  }

  render() {
    const {event, eventStatus, showModal} = this.props.event;
    const {type} = this.props.session;
    const bgImg = event.fields.image ? `/upload/${event.fields.image}` : sample1;
    const content = event.fields.process;
    const guest = event.fields.guest ? JSON.parse(event.fields.guest) : [];
    const sponsor = event.fields.sponsor ? JSON.parse(event.fields.sponsor) : [];

    return (
      <div className="eventview-page">
        <div className="container pos-rlt">
          <div className="h-v white row-col eventview-con" style={{backgroundImage: `url(${bgImg})`}}>
            <div className="row-cell v-t">
              <div className="container p-y-lg pos-rlt">
                {type === 1 && eventStatus === -1 && <button type="button" className="btn btn-danger event-register" onClick={() => { this.showModal(); }}>立即报名</button>}
                {type === 1 && eventStatus === 0 && <button type="button" className="btn btn-light event-register">报名成功，待审核</button>}
                {type === 1 && eventStatus === 1 && <button type="button" className="btn btn-light event-register">报名成功，审核通过</button>}
                <h3 className="display-4 _700 l-s-n-3x m-t-lg m-b-md">{event.fields.title}</h3>
                <h5><i className="fa fa-calendar m-r" aria-hidden="true" />{`${moment(event.fields.start_time).format('MM-DD HH:mm ddd')} - ${moment(event.fields.end_time).format('MM-DD HH:mm ddd')}`}</h5>
                <h5><i className="fa fa-map-marker" aria-hidden="true" style={{marginLeft: '.25rem', marginRight: '1.25rem', marginBottom: '5rem'}} />{event.fields.place}</h5>
                <h4 className="m-t-lg m-b-md"><i className="fa fa-user m-r" />活动嘉宾</h4>
                <div className="row row-sm">
                  {guest.length === 0 && <h5 className="col-sm-12">暂无嘉宾</h5>}
                  {guest.length > 0 && guest.map((item) => {
                    return (
                      <div className="col-xs-6 col-lg-4">
                        <div className="list-item box r m-b">
                          <a className="list-left">
                            <span className="w-40 avatar">
                              <img src={item.img ? `/upload/${item.img}` : avatarImg} alt="..." /> 
                            </span>
                          </a>
                          <div className="list-body">
                            <div className="text-ellipsis">
                              <span>{item.name}</span>
                            </div>
                            <small className="text-muted text-ellipsis">{item.desc}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h4 className="m-t-lg m-b-md"><i className="fa fa-suitcase m-r" />活动赞助商</h4>
                <div className="row">
                  {sponsor.length === 0 && <h5 className="col-sm-12">暂无赞助商</h5>}
                  {sponsor.length > 0 && sponsor.map((item) => {
                    return (
                      <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="box p-a-xs">
                          <div className="event-sponsor-img b-b" style={{backgroundImage: `url(${item.img ? `/upload/${item.img}` : sample1})`}} />
                          <div className="p-a-sm">
                            <div className="text-ellipsis">{item.name}</div>
                            <small className="text-muted text-ellipsis">{item.desc}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h4 className="m-t-lg m-b-md"><i className="fa fa-list m-r" />活动介绍</h4>
                <div className="eventview-content">
                  <div dangerouslySetInnerHTML={{__html: content}} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="m" className="modal in modal-small" style={{display: showModal ? "block" :"none"}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <img style={{width: '14px'}} src={closeImg} className="close" alt="" onClick={() => { this.closeModal(); }} />
              </div>
              <div className="modal-body text-center">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <textarea className="form-control" rows="5" placeholder="写些报名理由吧,从而更好的通过主办方的审核..." ref={editor => { this.editor = editor; }}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer text-center">
                <button type="button" className="btn btn-danger" onClick={() => { this.onSubmit(); }}>提交</button>
                <button type="button" className="btn btn-light m-l" onClick={() => { this.closeModal(); }}>取消</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop in" style={{display: showModal ? "block" : "none"}} />
      </div>
    );
  }
}
