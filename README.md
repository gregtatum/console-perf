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
addInitialMessage: 10.27ms
render: 1143.71ms
index.js:8
addMessage: 19.90ms (average 19.90ms)
addMessage: 16.54ms (average 18.22ms)
addMessage: 18.22ms (average 18.22ms)
addMessage: 13.51ms (average 17.04ms)
addMessage: 10.75ms (average 15.78ms)
addMessage: 13.90ms (average 15.47ms)
addMessage: 10.47ms (average 14.76ms)
addMessage: 9.70ms (average 14.12ms)
addMessage: 11.20ms (average 13.80ms)
addMessage: 8.99ms (average 13.32ms)
addMessage: 7.93ms (average 12.83ms)
addMessage: 7.39ms (average 12.38ms)
addMessage: 7.78ms (average 12.02ms)
addMessage: 6.06ms (average 11.60ms)
addMessage: 7.08ms (average 11.30ms)
addMessage: 6.91ms (average 11.02ms)
addMessage: 6.35ms (average 10.75ms)
addMessage: 5.75ms (average 10.47ms)
addMessage: 6.94ms (average 10.28ms)
addMessage: 7.68ms (average 10.15ms)
addMessage: 14.56ms (average 10.36ms)
addMessage: 7.81ms (average 10.25ms)
addMessage: 6.91ms (average 10.10ms)
addMessage: 6.72ms (average 9.96ms)
addMessage: 6.65ms (average 9.83ms)
addMessage: 7.55ms (average 9.74ms)
addMessage: 7.52ms (average 9.66ms)
addMessage: 6.20ms (average 9.54ms)
addMessage: 5.76ms (average 9.40ms)
```

## Profile

[https://perfht.ml/2mnNgYn](https://perfht.ml/2mnNgYn)

The update took significantly less time than the simple version.

# Slightly modified example

I modified the example slightly. This example only adds 1 message to the list of 10,000

[https://perfht.ml/2mmdlqP](https://perfht.ml/2mmdlqP)

```
addInitialMessage: 17.31ms
bundle.js:27619:5
render: 1526.8ms
addMessage: 9.98ms (average 9.98ms)
addMessage: 5.35ms (average 7.67ms)
addMessage: 3.86ms (average 6.40ms)
addMessage: 2.80ms (average 5.50ms)
addMessage: 3.05ms (average 5.01ms)
addMessage: 2.93ms (average 4.66ms)
addMessage: 2.77ms (average 4.39ms)
addMessage: 5.89ms (average 4.58ms)
addMessage: 3.32ms (average 4.44ms)
addMessage: 4.38ms (average 4.43ms)
addMessage: 3.48ms (average 4.34ms)
addMessage: 3.63ms (average 4.28ms)
addMessage: 3.91ms (average 4.26ms)
addMessage: 3.17ms (average 4.18ms)
addMessage: 2.52ms (average 4.07ms)
addMessage: 2.06ms (average 3.94ms)
addMessage: 1.76ms (average 3.81ms)
addMessage: 2.89ms (average 3.76ms)
addMessage: 2.84ms (average 3.71ms)
addMessage: 3.34ms (average 3.70ms)
addMessage: 3.04ms (average 3.66ms)
addMessage: 1.69ms (average 3.57ms)
addMessage: 1.51ms (average 3.49ms)
addMessage: 1.41ms (average 3.40ms)
addMessage: 1.61ms (average 3.33ms)
addMessage: 1.58ms (average 3.26ms)
addMessage: 1.51ms (average 3.20ms)
addMessage: 1.43ms (average 3.13ms)
```
