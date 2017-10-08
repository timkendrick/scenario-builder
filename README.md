# @timkendrick/scenario-builder
[![npm version](https://img.shields.io/npm/v/@timkendrick/scenario-builder.svg)](https://www.npmjs.com/package/@timkendrick/scenario-builder)
![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg)

> Unit test scenario builder for JavaScript projects

Write comprehensive unit test suites quickly and declaratively without any of the repetitive boilerplate.

## Installation

```bash
npm install @timkendrick/scenario-builder --save-dev
```

### Example

`sum.spec.js`:

```javascript
const scenarioBuilder = require('@timkendrick/scenario-builder');

// Function to test
const sum = require('./sum');

describe('sum', () => {
  // Create a pre-bound test runner that calls the function with test input
  const runScenario = scenarioBuilder((input) => sum(...input));

  // Use the test runner to run test assertions
  runScenario('sum()', { input: [], expected: 0 });
  runScenario('sum(0)', { input: [0], expected: 0 });
  runScenario('sum(1)', { input: [1], expected: 1 });
  runScenario('sum(1, 2, 3)', { input: [1, 2, 3], expected: 6 });
  runScenario('sum(-1, -2, -3)', { input: [-1, -2, -3], expected: -6 });
  runScenario('sum(Infinity, 1)', { input: [Infinity, 1], expected: Infinity });
  runScenario('sum(NaN, 1)', { input: [NaN, 1], expected: NaN });
});
```

Console output:

```
$ jest sum.spec.js

 PASS  ./sum.spec.js
  sum
    sum()
      ✓ SHOULD return the correct results (2ms)
    sum(0)
      ✓ SHOULD return the correct results (1ms)
    sum(1)
      ✓ SHOULD return the correct results (1ms)
    sum(1, 2, 3)
      ✓ SHOULD return the correct results (1ms)
    sum(-1, -2, -3)
      ✓ SHOULD return the correct results (1ms)
    sum(Infinity, 1)
      ✓ SHOULD return the correct results (1ms)
    sum(NaN, 1)
      ✓ SHOULD return the correct results (1ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.115s, estimated 1s
```

## Requirements

This package is compatible with test runners that provide the `describe()`, `it()` and `beforeEach()` global helpers.

## Usage

### `scenarioBuilder(fn)`

Creates a pre-bound test scenario generator function that, when called with specifics of a test scenario, can be used to assert the results of that scenario.

Arguments:

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| `fn` | `(input) => any` | Yes | N/A | Function that returns a result for the specified `input` |

Returns:

`(descriptions, options) => void` A function that can be invoked with details of a test scenario (see below) to assert based on the results of that scenario

### `scenarioBuilder(fn)(description, options)`

Given a pre-bound test scenario generator, create a new `describe()` test suite that runs an individual scenario to assert results for the specified input.

Arguments:

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| `description` | `string` | Yes | N/A | Description for the scenario |
| `options.input` | `any` | Yes | N/A | Input value for the scenario |
| `options.expected` | `any` | No | N/A | Expected result value for the scenario |
| `options.async` | `boolean` | No | `false` | Whether to await the result of the scenario |
| `options.before` | `() => (void \| Promise<void>)` | No | N/A | Actions to perform before the scenario is run |
| `options.assert` | `(result) => (void \| Promise<void>)` | No | N/A | Assertions to perform after the scenario has run |
