import dice from './dice';

describe('dice', () => {
  describe('parse', () => {
    it('Integer', () => {
      const input = '1';
      const expected_output = 1;
  
      const output = dice.parse(input);
  
      assert.equal(output, expected_output);
    });

  });
});