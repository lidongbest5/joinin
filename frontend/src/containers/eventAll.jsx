import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import Datetime from 'react-datetime';
import {myHistory} from '../config';
import * as baseActions from '../actions/base';
import {getEventAll} from '../sdk';
import Event from '../components/event';

import sample1 from '../images/sample1.png';

const mapStateToProps = state => ({
  eventall: state.eventall,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getEventAll,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class eventAllPage extends React.Component {
  constructor(props) {
    super(props);
    this.getListData = ::this.getListData;
    this.onHandlePageClick = ::this.onHandlePageClick;
    this.onChangePageSize = ::this.onChangePageSize;
    this.handleChangeStart = ::this.handleChangeStart;
    this.handleChangeEnd = ::this.handleChangeEnd;
    this.getParam = ::this.getParam;
    this.onFilter = ::this.onFilter;
  }

  componentDidMount() {
    this.getParam();
    // this.getListData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.query !== this.props.location.query) {
      const {category, q, startDate, endDate, curPage, pageSize} = this.props.location.query;
      this.props.actions.getEventAll({
        pageNo: curPage,
        pageSize: pageSize,
        category: category,
        q: q,
        startDate: startDate,
        endDate: endDate,
      });
    }
  }

  onHandlePageClick(data) {
    // this.getListData(data.selected+1);
    this.props.actions.setUIElement('eventall', 'curPage', data.selected+1).then(() => {
      this.getParam();
    });
  }

  onChangePageSize(event) {
    this.props.actions.setUIElement('eventall', 'pageSize', event.target.value).then(() => {
      this.getListData(1);
    });
  }

  onFilter(event) {
    event.preventDefault();

    this.props.actions.setUIElement('eventall', 'category', this.selectCategory.value).then(() => {
      this.getParam();
    });
  }

  getParam() {
    const {category, q, startDate, endDate, curPage, pageSize} = this.props.eventall;
    myHistory.push({
      pathname: '/event/all/',
      search: `?q=${q}&category=${category}&startDate=${startDate}&endDate=${endDate}&curPage=${curPage}&pageSize=${pageSize}`,
    });
  }

  getListData(pageNo=1, pageSize=this.props.eventall.pageSize) {
    this.props.actions.getEventAll({
      pageNo: pageNo,
      pageSize: pageSize,
    });
  }

  handleChangeStart(data) {
    this.props.actions.setUIElement('eventall', 'startDate', data);
  }

  handleChangeEnd(data) {
    this.props.actions.setUIElement('eventall', 'endDate', data);
  }

  render() {
    const {list, pages, curPage, listFetch, pageSize, pageTotal, startDate, endDate, category} = this.props.eventall;

    return (
      <div className="eventall-page">
        <div className="container">
          <div className="col-sm-12 bg-auto light lt">
            <div className="tab-content pos-rlt">
              <div className="tab-pane p-a-md active">
                <div className="clearfix m-b-md">
                  <form className="form-inline">
                    <div className="form-group m-r-md">
                      <label htmlFor="sex" className="m-r">活动类型</label>
                      <select className="form-control input-c" name="category" defaultValue={category} ref={selectCategory => { this.selectCategory = selectCategory; }}>
                        <option value="all">全部</option>
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
                    <div className="form-group m-r-lg">
                      <label htmlFor="sex" className="m-r">活动时间</label>
                      <div className="inline">
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
                      <span className="m-l-sm m-r-sm">一</span>
                      <div className="inline">
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
                    </div>
                    <button type="button" className="btn btn-danger" onClick={(event) => { this.onFilter(event); }}>筛选</button>
                  </form>
                </div>
                <div className="row">
                  {listFetch && list.length === 0 && <div className="text-center">没有活动哦</div>}
                  {list.length > 0 && list.map((item, index) => {
                    return (
                      <Event data={item} type={1} />
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
    );
  }
}
