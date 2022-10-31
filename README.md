<p align="center">
  <a href="https://sentry.io/?utm_source=github&utm_medium=logo" target="_blank">
    <img src="https://sentry-brand.storage.googleapis.com/sentry-wordmark-dark-280x84.png" alt="Sentry" width="280" height="84">
  </a>
</p>

# Official Sentry integration for JS Self Profiling (alpha ⚠️)

[![npm version](https://img.shields.io/npm/v/@sentry/profiling-browser.svg)](https://www.npmjs.com/package/@sentry/profiling-browser)
[![npm dm](https://img.shields.io/npm/dm/@sentry/profiling-browser.svg)](https://www.npmjs.com/package/@sentry/profiling-browser)
[![npm dt](https://img.shields.io/npm/dt/@sentry/profiling-browser.svg)](https://www.npmjs.com/package/@sentry/profiling-browser)

## Usage 🔥

```javascript
import * as Sentry from '@sentry/browser';
import '@sentry/tracing';
import { ProfilingIntegration } from '@sentry/profiling-browser'.

Sentry.init({
  dsn: 'https://7fa19397baaf433f919fbe02228d5470@o1137848.ingest.sentry.io/6625302',
  debug: true,
  tracesSampleRate: 1,
  profilesSampleRate: 1, // Set profiling sampling rate.
  integrations: [new ProfilingIntegration()]
});
```

Sentry SDK will now automatically profile all transactions, even the ones which may be started as a result of using an automatic instrumentation integration.

```javascript
const transaction = Sentry.startTransaction({ name: 'I will do some work' });

// The code between startTransaction and transaction.finish will be profiled

transaction.finish();
```

## FAQ 💭

### When should I not use this package

The package is still in alpha stage and we discourage using it in production systems while extensive testing is done. There is a possibility that adding this package may crash your entire node process (even when imported only in worker threads). We would also advise caution if you want to profile high throughput operations as starting the profiler adds some performance overhead and while we do have micro benchmarks to measure overhead, we have yet to properly test this on production system.

### Can the profiler leak PII to Sentry?

The profiler does not collect function arguments so leaking any PII is unlikely. We only collect a subset of the values which may identify the device and os that the profiler is running on - this is a smaller subset of the values already collected by the @sentry/node SDK.

The only way to leak PII would be if you are executing code like

```js
eval('function scriptFor${CUSTOMER_NAME}....');
```

In that case it is possible that the function name may end up being reported to Sentry.
