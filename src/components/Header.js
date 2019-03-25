import React, { Fragment } from 'react';
import { pure } from 'recompose';
import { OutboundLink } from 'react-ga';

const Header = () => {
  return (
    <Fragment>
      <h1> Simple SVG autocrop. Reduces file size, crops unwanted borders, reports possible SVG issues </h1>
      <h1> Drag your files anywhere or click to choose files to convert </h1>
  </Fragment>);
};

export default pure(Header);
