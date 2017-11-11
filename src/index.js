import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Console from './Console';

console.time("render")
ReactDOM.render(<Console mutableMessages={[]} />, document.getElementById('root'));
console.timeEnd("render")
