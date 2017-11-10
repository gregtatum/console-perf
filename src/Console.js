import React, { PureComponent } from 'react';
import './console.css';

class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: 20 + Math.floor(Math.random() * 100),
    }
  }

  render() {
    // for (let i = 0; i < 1e6; i += Math.random());
    console.log('<Message>' + this.props.text + '</Message>')
    return (
      <div className='message' style={{height: this.state.height}}>
        {this.props.text}
      </div>
    );
  }
}

let startUpdate = null
let n = 0
class Console extends PureComponent {
  constructor(props) {
    super(props)
    let messages = [];

    for (let i = 0; i < 1e4; i++) {
      messages.push('Message ' + n++);
    }

    this.state = {
      messages,
      atScrollBottom: true,
    };

    setInterval(this.addMessage.bind(this), 500);
  }

  addMessage() {
    for (let i = 0; i < 100; i++) {
      this.state.messages.push('Message ' + n++);
    }
    startUpdate = performance.now()
    this.forceUpdate();
  }

  componentDidMount() {
    this.forceBottomScroll();
  }

  componentDidUpdate() {
    if (startUpdate !== null) {
      console.log('Console updated in: ' + (performance.now() - startUpdate))
      startUpdate = null
    }
    if (this.state.atScrollBottom) {
      this.forceBottomScroll();
    }
  }

  forceBottomScroll() {
    this.container.scrollTop = 1e10;
  }

  render() {
    const { messages } = this.state;
    console.log('<Console />')
    return (
      <div className='console' ref={el => this.container = el}>
        {messages.map((text, index) =>
          <Message text={text} key={index} />
        )}
      </div>
    );
  }
}

export default Console;
