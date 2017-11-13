# Console Perf

This repo is a test-bed of console perf analysis. Each test is broken out into a different branch with its own README.md analysing the results. The tests use React 16.

## Batch add messages on an interval.

This test batch adds 100 messages every 500ms. This is a useful way to see how React's performance regresses over time.

```
<Console>
  <Message />
  <Message />
  <Message />
  <Message />
</Console>
```

* [View the branch and analysis](https://github.com/gregtatum/console-perf/tree/batch-add-interval)
* [https://perfht.ml/2yPxNGs](https://perfht.ml/2yPxNGs)
* `git checkout batch-add-interval`
* `npm start`

## `<MessageBatcher>` component

This test takes the list of messages and tries to minimize the `O(n)` characteristics of updating the list of messages.

* [View the branch and analysis](https://github.com/gregtatum/console-perf/tree/message-batcher-component)
* [https://perfht.ml/2hlsQda](https://perfht.ml/2hlsQda)
* `git checkout message-batcher-component`
* `npm start`

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
