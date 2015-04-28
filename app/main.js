'use strict';

import React from 'react';
import GolfTotaalBox from './GolfTotaalBox.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const url = '/golftotaal';

React.render(<GolfTotaalBox url={url}/>, document.getElementById('golfscoreTable'));

