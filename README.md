# Binary Tree Messages

This test builds up a binary tree of messages.

Instead of a JSX like:

```
<Console>
  <Message />
  <Message />
  <Message />
  <Message />
</Console>
```

It looks like:

```
<Console>
  <MessageTree>
    <MessageTree>
        <Message />
        <Message />
    </MessageTree>
    <MessageTree>
        <Message />
        <Message />
    </MessageTree>
  </MessageTree>
  <MessageTree>
    <MessageTree>
        <Message />
        null
    </MessageTree>
    null
  </MessageTree>
</Console>
```

## Timing for this test:

```
addInitialMessage: 13.1ms
first render: 1076.01ms
index.js:8
addMessage: 22.82ms (average 22.82ms)
addMessage: 23.50ms (average 23.16ms)
addMessage: 30.05ms (average 25.46ms)
addMessage: 23.84ms (average 25.05ms)
addMessage: 28.73ms (average 25.79ms)
addMessage: 26.39ms (average 25.89ms)
addMessage: 20.97ms (average 25.19ms)
addMessage: 18.90ms (average 24.40ms)
addMessage: 16.34ms (average 23.50ms)
addMessage: 13.51ms (average 22.50ms)
addMessage: 13.81ms (average 21.71ms)
addMessage: 14.89ms (average 21.14ms)
addMessage: 17.20ms (average 20.84ms)
addMessage: 11.14ms (average 20.15ms)
addMessage: 14.42ms (average 19.77ms)
addMessage: 13.51ms (average 19.38ms)
addMessage: 13.76ms (average 19.05ms)
addMessage: 12.98ms (average 18.71ms)
addMessage: 34.71ms (average 19.55ms)
addMessage: 27.28ms (average 19.94ms)
addMessage: 23.16ms (average 20.09ms)
addMessage: 27.17ms (average 20.41ms)
addMessage: 23.10ms (average 20.53ms)
addMessage: 18.09ms (average 20.43ms)
addMessage: 15.72ms (average 20.24ms)
addMessage: 15.18ms (average 20.04ms)
addMessage: 14.63ms (average 19.84ms)
addMessage: 16.33ms (average 19.72ms)
addMessage: 14.67ms (average 19.54ms)
addMessage: 13.15ms (average 19.33ms)
addMessage: 13.81ms (average 19.15ms)
addMessage: 13.63ms (average 18.98ms)
addMessage: 14.41ms (average 18.84ms)
addMessage: 13.35ms (average 18.68ms)
```

## Profile

[https://perfht.ml/2mmNzCX](https://perfht.ml/2mmNzCX)

The update took significantly less time than the simple version.
