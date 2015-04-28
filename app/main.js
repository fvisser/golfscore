'use strict';

import React from 'react';
import CommentBox from './CommentBox.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const url = '/golftotaal';

React.render(<CommentBox url={url}/>, document.getElementById('golfscoreTable'));

