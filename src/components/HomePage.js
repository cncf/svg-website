import React from 'react';
import { pure } from 'recompose';
import Header from './Header';



const HomePage = ({}) => {
  return [
    <Header />
    <div>
      <div><span>Status: </span></div>
      <div><span>Placeholder for a file input</span></div>
      <div><span>Placeholder for an original SVG</span></div>
      <div><span>Placeholder for an output SVG</span></div>
      <div><button>Clear</button></div>
      <div><button>Download></button></div>
    </div>
  ]
};

export default pure(HomePage);
