import React from 'react';
import { pure } from 'recompose';
import { OutboundLink } from 'react-ga';

const Header = () => {
  return (
    <h1> Simple SVG autocrop. Reduces file size, crops unwanted borders, reports possible SVG issues </h1>
  );
};

export default pure(Header);
