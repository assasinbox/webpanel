'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Provider = require('react-redux').Provider;

let modalsRoot = document.createElement("div");
modalsRoot.className = 'modalsRoot';
document.body.appendChild(modalsRoot);

ReactDOM.render(
  <div>
      <button onClick={() => alert(1) }>Test button</button>
  </div>,
  modalsRoot
);