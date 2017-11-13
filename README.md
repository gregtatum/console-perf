# <MessageBatcher> component

This test takes the list of messages and tries to minimize the `O(n)` characteristics of updating the list of messages.

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
  <MessageBatcher>
    <MessageBatch>
      <Message />
      <Message />
      <Message />
      <Message />
    </MessageBatch>
    <MessageBatch>
      <Message />
      <Message />
      <Message />
      <Message />
    </MessageBatch>
    <MessageBatch>
      <Message />
    </MessageBatch>
  </MessageBatcher>
</Console>
```

## Timing for this test:

```
render: 1056.15ms
addMessage: 29.93ms
addMessage: 33.79ms
addMessage: 30.8ms
addMessage: 32.93ms
addMessage: 26.01ms
addMessage: 29.91ms
addMessage: 21.05ms
addMessage: 28.04ms
addMessage: 34.78ms
addMessage: 33.6ms
addMessage: 25.2ms
addMessage: 29.83ms
addMessage: 22.45ms
addMessage: 27.22ms
addMessage: 17.16ms
addMessage: 18.8ms
```

## Profile

[https://perfht.ml/2hlsQda](https://perfht.ml/2hlsQda)

The message render was significantly faster. Out of a 40ms update for the MessageBatcher component, 10ms was spent on the batched messages, while 30ms was spent on the new and unbatched messages. I think coming up with a multiple tiered batching system would increase the speed even more. The batching amount was set to 100. I think doing some kind of tree-style batching would drive down the cost per-update for a long list to something like `O(log n)`.

Right now the batching looks like this (where `m` is a message):

```
| --------------------------------------------------------------------- |
|                             MessageBatcher                            |
| --------------------------------------------------------------------- |
|   batch   |   batch   |   batch   |   batch   |   batch   |   batch   |
| m m m m m | m m m m m | m m m m m | m m m m m | m m m m m | m m . . . |
```

But maybe it could start looking like this, where the batches are recursively batched into larger and larger groups. I think we can get a `O(n)` update down to a `O(log n)`, at least for the work being done by createElement and re-running the vdom diffing. The trade off is a bit more memory being allocated for the intermediate batch components.

```
| --------------------------------------------------------- |
|                      MessageBatcher                       |
| --------------------------------------------- | --------- |
|                     batch                     |   batch   |
| --------------------------------------------- | --------- |
|   batch   |   batch   |   batch   |   batch   |   batch   |
| m m m m m | m m m m m | m m m m m | m m m m m | m m . . . |
```

## Memory Allocation

In addition to batching the messages, the MessageBatcher can aggressively memoize and mutate certain data structures. The messages array can be mutable, so we don't have expensive `O(n)` copies and updates to that data structure of the components. The MessageBatcher retains the computed components.
