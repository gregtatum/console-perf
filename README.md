# Console Perf

This repo is a test-bed of console perf analysis.

## Batch add messages on an interval.

This test batch adds 100 messages every 500ms. This is a useful way to see how React's performance regresses over time.

* `git checkout batch-add-interval`
* [https://perfht.ml/2yPxNGs](https://perfht.ml/2yPxNGs)

## <MessageBatcher> component

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
