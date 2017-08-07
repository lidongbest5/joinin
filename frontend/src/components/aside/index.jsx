import React from 'react';
import {Link, IndexLink} from 'react-router';
import classNames from 'classnames';

import './style.scss';
import logo from '../../images/logo.png';
import navFengxiangbiao from '../../images/nav_fengxiangbiao.png';
import navZhuibensuyuan from '../../images/nav_zhuibensuyuan.png';
import navXitong from '../../images/nav_xitong.png';
import navArrow from '../../images/nav_arrow.png';
import navMoxing from '../../images/nav_moxing.png';

export default class Aside extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="aside" className="app-aside modal fade md nav-expand">
        <div className="left navside white">
          <div className="navbar navbar-md no-radius">
            <div className="navbar-brand">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div>12</div>
        </div>
      </div>
    );
  }
}
