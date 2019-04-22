import React from 'react';

const times = (n, func) => [...Array(n)].map((val, index) => func(index));

class LoadingIndicator extends React.Component {
  getSpacer(index) {
    const { size = 128 } = this.props;
    const spacerSize = Math.round(size * 0.8);
    const borderSize = Math.round(size * 0.1);
    return (
      <div key={index} style={{
        height: `${spacerSize}px`,
        width: `${spacerSize}px`,
        margin: `${borderSize}px`,
        border: `${borderSize}px solid`,
        borderColor: `${this.props.color || '#222'} transparent transparent transparent`,
      }} />
    )
  }

  render() {
    const { margin = 0, size = 128, center } = this.props;
    let style = {
      margin,
      height: size,
      width: size,
    };
    if(center) {
      style = {
        ...style,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }
    return (<div style={style} className="loadingIndicator">{times(4, (index) => this.getSpacer(index))}</div>);
  }
}

export default LoadingIndicator;