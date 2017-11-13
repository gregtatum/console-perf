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
    return (
      <div className='message' style={{height: this.state.height}}>
        {this.props.text}
      </div>
    );
  }
}

function createTimer (label) {
  let calls = 0
  let averageTime = null
  let startTime

  return {
    start: () => {
      startTime = performance.now()
    },
    end: () => {
      const timeDiff = performance.now() - startTime
      calls++
      if (averageTime === null) {
        averageTime = timeDiff
      } else {
        averageTime *= (calls - 1) / calls
        averageTime += timeDiff / calls
      }
      console.log(`${label}: ${timeDiff.toFixed(2)}ms (average ${averageTime.toFixed(2)}ms)`)
    }
  }
}

const addMessageTimer = createTimer("addMessage")

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
    addMessageTimer.start()
    for (let i = 0; i < 100; i++) {
      this.state.messages.push('Message ' + n++);
    }
    this.forceUpdate();
    addMessageTimer.end()
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.container.scrollTop = 1e10;
    })
  }

  componentDidUpdate() {
    if (startUpdate !== null) {
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
