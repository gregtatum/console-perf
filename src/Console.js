import React, { PureComponent } from 'react';
import './console.css';

class MessageBatcher extends PureComponent {
  constructor(props) {
    super(props);

    // The following are all mutable targets for memoizing the updated messages.
    // Do not use the state functionality, as we don't need to trigger the
    // component update cycles, plus we want to minimize GC.
    this._messageBatches = []
    this._components = []
    this._lastMessageLength = 0

    this.receiveNewMessages(props)
  }

  receiveNewMessages(props) {
    const { mutableMessages, batchSize } = props
    const startMessageIndex = this._lastMessageLength - (this._lastMessageLength % batchSize)
    const startBatchIndex = Math.floor(this._lastMessageLength / batchSize)
    const batchLength = Math.ceil(mutableMessages.length / batchSize)

    // Create the new batches, removing the last incomplete one so that batch components
    // can use strict equality to determine new batches.
    for (let i = startBatchIndex; i < batchLength; i++) {
      this._messageBatches[i] = []
    }

    // Take the new messages, and put them into batches.
    for (let i = startMessageIndex; i < mutableMessages.length; i++) {
      const batch = this._messageBatches[Math.floor(i / batchSize)]
      batch[i % batchSize] = mutableMessages[i]
    }

    // Take the new message batches, and create the React elements.
    for (let i = startBatchIndex; i < batchLength; i++) {
      const messageBatch = this._messageBatches[i]
      this._components[i] = <MessageBatch messageBatch={messageBatch} key={i} />
    }

    this._lastMessageLength = mutableMessages.length
  }

  componentWillReceiveProps(props) {
    this.receiveNewMessages(props)
  }

  render() {
    return (
      <div>{this._components}</div>
    )
  }
}

class MessageBatch extends PureComponent {
  render() {
    return (
      <div>
        {this.props.messageBatch.map((text, index) => {
          return <Message text={text} key={index} />
        })}
      </div>
    )
  }
}

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

let startUpdate = null
let n = 0
class Console extends PureComponent {
  constructor(props) {
    super(props)

    for (let i = 0; i < 1e4; i++) {
      this.props.mutableMessages.push('Message ' + n++);
    }

    this.state = {
      atScrollBottom: true,
    };

    setInterval(this.addMessage.bind(this), 500);
  }

  addMessage() {
    console.time("addMessage")
    for (let i = 0; i < 1e2; i++) {
      this.props.mutableMessages.push('Message ' + n++);
    }
    startUpdate = performance.now()
    this.forceUpdate();
    console.timeEnd("addMessage")
  }

  componentDidMount() {
    this.forceBottomScroll();
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
    const { mutableMessages } = this.props;
    return (
      <div className='console' ref={el => this.container = el}>
        Batcher:
        <MessageBatcher
          batchSize={200}
          mutableMessages={mutableMessages}
          messageLength={mutableMessages.length} />
      </div>
    );
  }
}

export default Console;
