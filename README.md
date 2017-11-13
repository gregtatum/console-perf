# Console Perf

This repo is a test-bed of console perf analysis. Checkout the master branch for a full description. This setup does a simple console example, where 100 messages are added every 500ms. It starts with 10,000 messages to really create some pressure on the components.

## Timing for this test:

```
initialize: 1004.58ms
addMessage: 615.55ms
addMessage: 181.07ms
addMessage: 135.6ms
addMessage: 118.86ms
addMessage: 196.79ms
addMessage: 215.69ms
addMessage: 122.4ms
addMessage: 121.36ms
addMessage: 122.64ms
addMessage: 210.45ms
addMessage: 396.97ms
addMessage: 124.8ms
addMessage: 126.18ms
addMessage: 138.51ms
addMessage: 195.04ms
addMessage: 420.82ms
addMessage: 138.98ms
```

## Profile

[https://perfht.ml/2hoKtc1](https://perfht.ml/2hoKtc1)

It looks like a ton of time is being spent in `createElement`, then in long GC pauses cleaning up the old elements. I had trouble getting sensible results on a production build, but there is some overhead on the development mode verification. createElement was about 20% of the time, or 211ms. At least 45% of the time was being spent in one long GC pause, [although there were many more instance of GC happening](https://perfht.ml/2hn9lBa). It seems like the biggest pressure then is from minimizing the long lists of small elements being created over and over again.  
