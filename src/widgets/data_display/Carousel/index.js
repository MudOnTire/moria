import React from 'react';
import { Carousel as AntCarousel } from 'antd';
import WidgetWrapper from 'Src/components/WidgetWrapper';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Image({ config }) {

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  return (
    <WidgetWrapper config={config}>
      <AntCarousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </AntCarousel>
    </WidgetWrapper >
  )
}