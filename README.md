# Console Perf

This repo is a test-bed of console perf analysis. Checkout the master branch for a full description. This setup does a simple console example, where 100 messages are added every 500ms. It starts with 10,000 messages to really create some pressure on the components.

## Timing for this test:

```
initialize: 608.67ms
addMessage: 211.64ms (average 211.64ms)
addMessage: 246.64ms (average 229.14ms)
addMessage: 322.88ms (average 260.39ms)
addMessage: 116.86ms (average 224.50ms)
addMessage: 120.26ms (average 203.65ms)
addMessage: 345.07ms (average 227.22ms)
addMessage: 120.40ms (average 211.96ms)
addMessage: 123.85ms (average 200.95ms)
addMessage: 177.03ms (average 198.29ms)
addMessage: 139.48ms (average 192.41ms)
addMessage: 127.39ms (average 186.50ms)
addMessage: 138.18ms (average 182.47ms)
addMessage: 126.91ms (average 178.20ms)
addMessage: 393.15ms (average 193.55ms)
addMessage: 312.70ms (average 201.50ms)
addMessage: 128.84ms (average 196.96ms)
addMessage: 174.89ms (average 195.66ms)
addMessage: 196.09ms (average 195.68ms)
addMessage: 127.90ms (average 192.11ms)
addMessage: 314.84ms (average 198.25ms)
addMessage: 157.66ms (average 196.32ms)
addMessage: 194.78ms (average 196.25ms)
addMessage: 214.87ms (average 197.06ms)
addMessage: 164.94ms (average 195.72ms)
addMessage: 214.68ms (average 196.48ms)
addMessage: 224.84ms (average 197.57ms)
addMessage: 148.98ms (average 195.77ms)
addMessage: 215.50ms (average 196.47ms)
addMessage: 242.47ms (average 198.06ms)
```

## Profile

[https://perfht.ml/2zEsGs0](https://perfht.ml/2zEsGs0)

It looks like a ton of time is being spent in `createElement`, then in long GC pauses cleaning up the old elements. I had trouble getting sensible results on a production build, but there is some overhead on the development mode verification. createElement was about 20% of the time, or 211ms. At least 45% of the time was being spent in one long GC pause, [although there were many more instance of GC happening](https://perfht.ml/2hn9lBa (this is an older run of the profile)). It seems like the biggest pressure then is from minimizing the long lists of small elements being created over and over again.  

## Profile with adding 1 message

```
initialize: 641.27ms
addMessage: 410.64ms (average 410.64ms)
addMessage: 165.59ms (average 288.11ms)
addMessage: 123.91ms (average 233.38ms)
addMessage: 105.03ms (average 201.29ms)
addMessage: 119.87ms (average 185.01ms)
addMessage: 128.90ms (average 175.66ms)
addMessage: 112.22ms (average 166.59ms)
addMessage: 108.53ms (average 159.34ms)
addMessage: 108.97ms (average 153.74ms)
addMessage: 185.87ms (average 156.95ms)
addMessage: 300.87ms (average 170.04ms)
addMessage: 101.91ms (average 164.36ms)
addMessage: 99.61ms (average 159.38ms)
addMessage: 146.48ms (average 158.46ms)
addMessage: 113.56ms (average 155.46ms)
addMessage: 108.65ms (average 152.54ms)
```
