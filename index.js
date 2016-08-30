'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Provider = require('react-redux').Provider;
// let ImageManagerLib = require('../../../lib');

// let ImageManagerComponent = ImageManagerLib.ImageManagerComponent;
// let SignatureManagerComponent = ImageManagerLib.SignatureManagerComponent;
// const store = ImageManagerLib.create();

let modalsRoot = document.createElement("div");
modalsRoot.className = 'modalsRoot';
document.body.appendChild(modalsRoot);

ReactDOM.render(
  <div>
    <button onClick={() => alert(1) }>Open Image Manager</button>
    <button onClick={() => alert(2) }>Open Signature Manager</button>

  </div>,
  modalsRoot
);