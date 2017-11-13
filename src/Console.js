import React, { PureComponent } from 'react';
import './console.css';
import addMessageToBinaryTree from './message-tree'

class MessageTree extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSide(side) {
    if (side === null) {
      return <div></div>
    } else if (typeof side === 'string') {
      return <div>{side}</div>
    } else {
      return <MessageTree messageTree={side} />
    }
  }

  render() {
    const { messageTree: { left, right } } = this.props

    if (left === null && right === null) {
      return null
    }

    return (
      <div>
        {this.renderSide(left)}
        {this.renderSide(right)}
      </div>
    )
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

let n = 0
const addMessageTimer = createTimer("addMessage")
class Console extends PureComponent {
  constructor(props) {
    super(props)

    let messageTree
    console.time("addInitialMessage")
    for (let i = 0; i < 1e4; i++) {
      messageTree = addMessageToBinaryTree(messageTree, 'Message ' + n++)
    }
    console.timeEnd("addInitialMessage")
    this.state = {
      atScrollBottom: true,
      messageTree
    };

    setInterval(this.addMessage.bind(this), 500);
  }

  addMessage() {
    addMessageTimer.start()
    let { messageTree } = this.state
    for (let i = 0; i < 1e2; i++) {
      messageTree = addMessageToBinaryTree(messageTree, 'Message ' + n++)
    }
    this.setState({ messageTree })
    addMessageTimer.end()
  }

  componentDidMount() {
    this.forceBottomScroll();
  }

  componentDidUpdate() {
    if (this.state.atScrollBottom) {
      this.forceBottomScroll();
    }
  }

  forceBottomScroll() {
    requestAnimationFrame(() => {
      this.container.scrollTop = 1e10;
    })
  }

  render() {
    const { messageTree } = this.state;
    return (
      <div className='console' ref={el => this.container = el}>
        <MessageTree messageTree={messageTree} />
      </div>
    );
  }
}

export default Console;
