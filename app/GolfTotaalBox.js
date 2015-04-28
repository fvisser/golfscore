'use strict';

import React from 'react';
import GolfTotaal from './GolfTotaal.js';
import Reqwest from 'reqwest';

export default class GolfTotaalBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    new Reqwest({
      url: this.props.url,
      method: 'get',
      dataType: 'json',
      success: (data) => {this.setState({data: data});},
      error: (xhr, status, err) => {console.error(this.props.url, status, err.toString());}
    });
  }

  render() {
    return (
      <div className='golf-main'>
        <GolfTotaal data={this.state.data}/>
      </div>
    );
  }
}