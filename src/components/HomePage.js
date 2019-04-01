import React, { Fragment } from 'react';
import { pure } from 'recompose';
import Header from './Header';
import Dropzone from 'react-dropzone'
import _ from 'lodash';

const Converter = function({id, status, inputFile, outputFile, removeConverter, downloadFile}) {
  function imageUrl(file) {
    if (!file) {
      return null;
    }
    return `url('data: image/svg+xml;base64,${btoa(file)}')`;
  }
  return (
    <div>
      <div><span>Status: </span>{status}</div>
      <div style={{
        width: 200,
        height: 200,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: imageUrl(inputFile),
        border: '1px solid #aaa'}} />
      <div style={{
        width: 200,
        height: 200,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: imageUrl(outputFile),
        border: '1px solid #aaa'}} />
      <div><button onClick={() => removeConverter(id)}>Clear</button></div>
      <div><button onClick={() => downloadFile(id)}>Download></button></div>
    </div>
  );
}



const HomePage = ({converters, receiveFiles, removeConverter, downloadFile}) => {
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
        return <Converter {...converter} removeConverter={removeConverter} downloadFile={downloadFile} />
      }) }
    </Fragment>
  </Fragment>)
};

export default pure(HomePage);
