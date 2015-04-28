'use strict';

import React from 'react';
import {GolfTotaal} from './GolfTotaal.js';
import Reqwest from 'reqwest';

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function () {
    new Reqwest({
      url: this.props.url,
      method: 'get',
      dataType: 'json',
      success: function (data) {
        console.log('success'. data);
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div className='golf-main'>
        <GolfTotaal data={this.state.data}/>
      </div>
    );
  }
});