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
render: 616.84ms
addMessage: 19.83ms (average 19.83ms)
addMessage: 27.56ms (average 23.70ms)
addMessage: 13.28ms (average 20.22ms)
addMessage: 17.76ms (average 19.61ms)
addMessage: 14.73ms (average 18.63ms)
addMessage: 16.86ms (average 18.34ms)
addMessage: 12.22ms (average 17.46ms)
addMessage: 12.25ms (average 16.81ms)
addMessage: 10.73ms (average 16.13ms)
addMessage: 18.12ms (average 16.33ms)
addMessage: 12.01ms (average 15.94ms)
addMessage: 13.11ms (average 15.70ms)
addMessage: 8.86ms (average 15.18ms)
addMessage: 15.14ms (average 15.17ms)
addMessage: 8.82ms (average 14.75ms)
addMessage: 9.40ms (average 14.42ms)
addMessage: 9.00ms (average 14.10ms)
addMessage: 10.53ms (average 13.90ms)
addMessage: 9.59ms (average 13.67ms)
addMessage: 10.68ms (average 13.52ms)
addMessage: 9.83ms (average 13.35ms)
addMessage: 11.09ms (average 13.24ms)
addMessage: 9.62ms (average 13.09ms)
addMessage: 15.98ms (average 13.21ms)
addMessage: 9.53ms (average 13.06ms)
addMessage: 10.64ms (average 12.97ms)
addMessage: 9.76ms (average 12.85ms)
addMessage: 11.18ms (average 12.79ms)
addMessage: 8.61ms (average 12.64ms)
addMessage: 11.19ms (average 12.60ms
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
