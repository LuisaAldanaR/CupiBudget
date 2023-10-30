import React, { Component } from 'react';

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (this.containerRef.current && !this.containerRef.current.contains(e.target)) {
      this.props.onClickOutside();
    }
  };

  render() {
    return <div ref={this.containerRef}>{this.props.children}</div>;
  }
}

export default ClickOutside;