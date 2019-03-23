import React from 'react';
import { pure } from 'recompose';
import Header from './Header';
import Dropzone from 'react-dropzone'



const HomePage = ({}) => {
  return [
    <Header />,
    <Dropzone onDrop={ (x) => console.info(x) }>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0}}>
          <input {...getInputProps() } />
        </div>
      )}
    </Dropzone>,
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
