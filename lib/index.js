function scenarioBuilder(command) {
  const runner = run.bind(null, describe);
  runner.only = run.bind(null, describe.only);
  runner.skip = run.bind(null, describe.skip);
  return runner;

  function run(describe, description, options) {
    describe(description, () => {
      let actual;
      beforeEach(() => (
        Promise.resolve(options.before ? options.before() : undefined).then(() => {
          const result = command(options.input);
          if (options.async) {
            return result.then((value) => {
              actual = value;
            });
          }
          actual = result;
        })
      ));

      if ('expected' in options) {
        it('SHOULD return the correct results', () => {
          expect(actual).toEqual(options.expected);
        });
      }

      if (options.assert) {
        it('SHOULD pass assertions', () => (
          options.assert(actual)
        ));
      }
    });
  }
}

module.exports = scenarioBuilder;
