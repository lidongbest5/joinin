import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as baseActions from '../actions/base';
import {getRecomentEvent} from '../sdk';

import Event from '../components/event';

const mapStateToProps = state => ({
  session: state.session,
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...baseActions,
    getRecomentEvent,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getRecomentEvent();
  }

  render() {
    const {recomentEvents} = this.props.event;

    return (
      <div className="headpage">
        <div dangerouslySetInnerHTML={{__html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" height="30" style="position:fixed; z-index:0; left:50%; top: 20%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="rgba(0,0,0,0.05)"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="10" height="10" style="position:fixed; z-index:0; left:49%; top: 15%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#a88add"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="5" height="5" style="position:fixed; z-index:0; left:30%; top: 0%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#a88add"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" style="position:fixed; z-index:0; right:5%; top: 30%"><path d="M 48 0 L 24 48 L 0 0 Z" fill="#0cc2aa"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="15" height="15" style="position:fixed; z-index:0; left:34.5%; top: 55%"><path d="M 0 48 L 24 0 L 48 48 Z" fill="#fcc100"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="200" height="200" style="position:fixed; z-index:0; right:20%; top: 70%"><path d="M 0 48 L 24 0 L 48 48 Z" fill="rgba(252,193,0,0.1)"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="120" height="120" style="position:fixed; z-index:0; left:0%; top: 30%"><path d="M 0 48 L 48 24 L 0 0 Z" fill="rgba(0,0,0,0.03)"></path></svg>'}} />
        <div className="h-v white row-col">
          <div className="row-cell v-m">
            <div className="container p-y-lg pos-rlt">
              <h1 className="display-4 _700 l-s-n-3x m-t-lg m-b-md">比知识更重要的，是让这个世界更懂我</h1>
              <h5 className="text-muted m-b-lg"><span className="label accent m-r">发现</span><span className="label accent m-r">参与</span><span className="label accent m-r">加入</span>让我们帮助你们学到更多</h5>
              <a href="#demos" ui-scroll-to="demos" className="btn btn-lg btn-outline b-danger text-danger b-2x">发现活动</a>
            </div>
          </div>
        </div>
        <div className="p-y-lg" id="demos">
          <div className="container p-y-lg text-danger-hover">
            <h3 className=" _700 l-s-n-1x m-b-md">推荐活动</h3>
            <div className="row m-y-lg">
              {recomentEvents.map((item) => {
                return (
                  <Event data={item} type={1} />
                );
              })}
            </div>
            <div className="text-center">
              <Link to="/event/all/" className="btn btn-lg btn-outline b-danger text-danger">更多活动</Link>
            </div>
          </div>
        </div>
        <div className="pos-rlt">
          <div className="container">
            <h3 className=" _700 l-s-n-1x m-b-md">分类</h3>
            <div className="h-v-3 row-col text-center">
              <div className="col-sm-3 deep-purple v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">创业</h2>
                  <p className="h5 text-muted l-h">Start Up</p>
                </div>
              </div>
              <div className="col-sm-3 red-700 v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">公益</h2>
                  <p className="h5 text-muted l-h">Public Benefit</p>
                </div>
              </div>
              <div className="col-sm-3 primary v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">科技</h2>
                  <p className="h5 text-muted l-h">Technology</p>
                </div>
              </div>
              <div className="col-sm-3 warn v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">运动</h2>
                  <p className="h5 text-muted l-h">Sports</p>
                </div>
              </div>
            </div>
            <div className="h-v-3 row-col text-center">
              <div className="col-sm-3 blue v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">互联网</h2>
                  <p className="h5 text-muted l-h">Internet</p>
                </div>
              </div>
              <div className="col-sm-3 grey v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">教育</h2>
                  <p className="h5 text-muted l-h">Education</p>
                </div>
              </div>
              <div className="col-sm-3 success v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">职场</h2>
                  <p className="h5 text-muted l-h">Job</p>
                </div>
              </div>
              <div className="col-sm-3 info v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">健康</h2>
                  <p className="h5 text-muted l-h">Health</p>
                </div>
              </div>
            </div>
            <div className="h-v-3 row-col text-center">
              <div className="col-sm-3 deep-purple v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">文艺</h2>
                  <p className="h5 text-muted l-h">Art</p>
                </div>
              </div>
              <div className="col-sm-3 red-700 v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">心理</h2>
                  <p className="h5 text-muted l-h">Mentality</p>
                </div>
              </div>
              <div className="col-sm-3 primary v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">户外</h2>
                  <p className="h5 text-muted l-h">Outdoor</p>
                </div>
              </div>
              <div className="col-sm-3 warn v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">金融</h2>
                  <p className="h5 text-muted l-h">Finance</p>
                </div>
              </div>
            </div>
            <div className="h-v-3 row-col text-center">
              <div className="col-sm-3 blue v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">旅行</h2>
                  <p className="h5 text-muted l-h">Travel</p>
                </div>
              </div>
              <div className="col-sm-3 grey v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">读书</h2>
                  <p className="h5 text-muted l-h">Book</p>
                </div>
              </div>
              <div className="col-sm-3 success v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">电商</h2>
                  <p className="h5 text-muted l-h">E-Commerce</p>
                </div>
              </div>
              <div className="col-sm-3 info v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">时尚</h2>
                  <p className="h5 text-muted l-h">Fashion</p>
                </div>
              </div>
            </div>
            <div className="h-v-3 row-col text-center">
              <div className="col-sm-3 deep-purple v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">设计</h2>
                  <p className="h5 text-muted l-h">Design</p>
                </div>
              </div>
              <div className="col-sm-3 red-700 v-m">
                <div className="p-a-lg">
                  <h2 className=" _700 l-s-n-1x m-y m-b-md">游戏</h2>
                  <p className="h5 text-muted l-h">Game</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="black pos-rlt">
          <div className="footer dk">
            <div className="text-center container p-y-lg">
              <div className="clearfix text-lg m-t m-b">
                <strong>Join In</strong> 发现 参与 加入
              </div>
              <div className="block clearfix">
                <a href="" className="btn btn-icon btn-social rounded btn-sm m-r">
                  <i className="fa fa-wechat"></i>
                  <i className="fa fa-wechat light-blue"></i>
                </a>
                <a href="" className="btn btn-icon btn-social rounded btn-sm">
                  <i className="fa fa-weibo"></i>
                  <i className="fa fa-weibo pink"></i>
                </a>
              </div>
            </div>
            <div className="b b-b" />
            <div className="p-a-md">
              <div className="row footer-bottom">
                <div className="col-sm-8">
                  <small className="text-muted">© Copyright 2017. All rights reserved.</small>
                </div>
                <div className="col-sm-4">
                  <div className="text-sm-right text-xs-left">
                    <strong>Join In</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
