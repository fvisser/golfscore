'use strict';

//PlayList
import React from 'react';
import {Paper} from 'material-ui';
import _ from 'underscore';

require('./less/main.less');

export default class GolfTotaal extends React.Component {
  render() {

    const results = _.chain(this.props.data)
      .mapObject((val, key) => {
        return {played: key, results: val};
      })
      .sortBy(object => object.score)
      .values();

    const table = results.reverse().map((object) => {
        console.log('object', object);
        return _.map(object.results, (result, index) =>
          <tr className='mui-table-rows'>
            <td className='material-table-row-item'>{index === 0 ? object.played : ''}</td>
            <td className='material-table-row-item'>{result.player}</td>
            <td className='material-table-row-item'>{result.score}</td>
            <td className='material-table-row-item'>{result.average}</td>
          </tr>);
      }
    );

    return (
        <Paper zdepth='2'>
          <p>
            <h2>Results</h2>
            <table>
              <tbody>
              <tr className='mui-table-header'>
                <th className='material-table-header-item'>Rounds played</th>
                <th className='material-table-header-item'>player</th>
                <th className='material-table-header-item'>total</th>
                <th className='material-table-header-item'>average</th>
              </tr>
              {table}
              </tbody>
            </table>
          </p>
        </Paper>
    );
  }
}