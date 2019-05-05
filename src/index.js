require('@babel/polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

ReactDOM.render(<Main />,
  document.getElementById('root')
);

if(module.hot && module.hot.accept) {
  module.hot.accept();
}