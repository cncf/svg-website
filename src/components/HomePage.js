import React from 'react';
import { pure } from 'recompose';
import Header from './Header';
import Dropzone from 'react-dropzone'



const HomePage = ({}) => {
  return [
    <Header />,
    <Dropzone onDrop={ (x) => console.info(x) }>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()}>
          <input {...getInputProps() } />
          <div>Drag 'n' drop some files here, or click to select files</div>
          <div><span>Status: </span></div>
          <div><span>Placeholder for a file input</span></div>
          <div><span>Placeholder for an original SVG</span></div>
          <div><span>Placeholder for an output SVG</span></div>
          <div><button>Clear</button></div>
          <div><button>Download></button></div>
        </div>
      )}
    </Dropzone>
  ]
};

export default pure(HomePage);
