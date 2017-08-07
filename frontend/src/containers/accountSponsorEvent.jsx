import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import Event from '../components/event';
import * as baseActions from '../actions/base';
import {getUserEvent, setLike} from '../sdk';

const mapStateToProps = state => ({
  session: state.session,
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getUserEvent,
    setLike,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class accountSponsorEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.getListData = ::this.getListData;
    this.onHandlePageClick = ::this.onHandlePageClick;
    this.onChangePageSize = ::this.onChangePageSize;
  }

  componentDidMount() {
    this.getListData();
  }

  onHandlePageClick(data) {
    this.getListData(data.selected+1);
  }

  onChangePageSize(event) {
    this.props.actions.setUIElement('event', 'pageSize', event.target.value).then(() => {
      this.getListData(1);
    });
  }

  getListData(pageNo=1, pageSize=this.props.event.pageSize) {
    this.props.actions.getUserEvent({
      pageNo: pageNo,
      pageSize: pageSize,
    });
  }

  render() {
    const {liked, list, pages, curPage, listFetch, pageSize, pageTotal} = this.props.event;

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
                <div className="tab-pane p-a-md active">
                  <div className="clearfix m-b">
                    <Link className="md-btn md-raised m-b-sm w-xs red pull-right" to="/event/new/">新建活动</Link>
                  </div>
                  <div className="row">
                    {listFetch && list.length === 0 && <div className="text-center">暂无活动</div>}
                    {list.length > 0 && list.map((item, index) => {
                      return (
                        <Event data={item} type={2} />
                      );
                    })}
                  </div>
                  {pages !== 0 && <div className="paginate-container">
                    <ReactPaginate
                      previousLabel={"上一页"}
                      nextLabel={"下一页"}
                      breakLabel={<a>...</a>}
                      breakClassName={"break-me"}
                      initialPage={curPage-1}
                      forcePage={curPage-1}
                      pageCount={pages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.onHandlePageClick}
                      disableInitialCallback={true}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
                    <div className="paganate-records pull-right">
                      共{pageTotal}条记录
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
