import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';
import moment from 'moment';
import * as baseActions from '../../actions/base';
import sample1 from '../../images/sample1.png';
import {setLike} from '../../sdk';

import './style.scss';

const mapStateToProps = state => ({
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    setLike,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.onLike = ::this.onLike;
  }

  componentDidMount() {

  }

  onLike(data) {
    const liked = this.props.event.liked;
    if (!liked.includes(data)) {
      liked.push(data);
      this.props.actions.setUIElement('event', 'liked', liked);
      this.props.actions.setLike({id: data});
    }
  }

  render() {
    const {data, type} = this.props;
    const {liked} = this.props.event;

    return (
      <div className="col-md-6 col-lg-4 event-box">
        <div className="box white box-shadow-z3 text-center">
          {type === 2 && <div className="event-edit text-info">
            <Link className="m-r-sm" to={`/event/edit/${data.pk}/`}>编辑</Link>
            <Link to={`/event/check/${data.pk}/`}>报名审核</Link>
          </div>}
          <Link to={`/event/view/${data.pk}/`}>
            <div className="event-banner-img b-b m-b" style={{backgroundImage: `url(${data.fields.image ? `/upload/${data.fields.image}` : sample1})`}} />
            <span className="_800 p-a block h4 m-a-0">{data.fields.title}</span>
          </Link>
          <div className="box-body">
            <p>{`${moment(data.fields.start_time).format('MM-DD HH:mm ddd')} - ${moment(data.fields.end_time).format('MM-DD HH:mm ddd')}`}</p>
            <p>{data.fields.place}</p>
          </div>
          <div className="row-col b-t text-left padding-sm text-white-hover">
            <a className="label red text-white event-label">{`#${data.fields.category}`}</a>
            <a className={classNames("pull-right like-con", {"text-muted": !liked.includes(data.pk)}, {"text-danger": liked.includes(data.pk)})} onClick={() => { this.onLike(data.pk); }}>
              <i className="fa fa-heart" aria-hidden="true" /> {`${liked.includes(data.pk) ? (data.fields.like+1) : data.fields.like}赞`}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
