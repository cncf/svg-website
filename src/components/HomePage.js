import React, { Fragment } from 'react';
import { pure } from 'recompose';
import Header from './Header';
import Dropzone from 'react-dropzone'
import _ from 'lodash';

const Converter = function({id, status, inputFile}) {
  const inputImageUrl = (function() {
    if (!inputFile) {
      return null;
    }
    return `url('data: image/svg+xml;base64,${btoa(inputFile)}')`;
  })();
  return (
    <div>
      <div><span>Status: </span>{status}</div>
      <div style={{
        width: 200,
        height: 200,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: inputImageUrl,
        border: '1px solid #aaa'}} />
      <div><span>Placeholder for an output SVG</span></div>
      <div><button>Clear</button></div>
      <div><button>Download></button></div>
    </div>
  );
}



const HomePage = ({converters, receiveFiles}) => {
  return (<Fragment>
    <Header />
    <Dropzone onDrop={ (x) => receiveFiles(x) }>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} style={{position: 'fixed', left: 0, top: 0, right: 0, height: 200}}>
          <input {...getInputProps() } />
        </div>
      )}
    </Dropzone>
    <Fragment>
      { _.values(converters).map(function(converter) {
        return <Converter {...converter} />
      }) }
    </Fragment>
  </Fragment>)
};

export default pure(HomePage);
