import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

ReactDOM.render(<Main />,
  document.getElementById('root')
);

if(module.hot && module.hot.accept) {
  module.hot.accept();
}