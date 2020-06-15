const palindrome = require('../utils/dumb').palindrome;

test('palindrome of "a"', () => {
  const result = palindrome('a');

  expect(result).toBe('a');
});

test('palindrome of "react"', () => {
  const result = palindrome('react');

  expect(result).toBe('tcaer');
});

test('palindrome of "tacocat"', () => {
  const result = palindrome('tacocat');

  expect(result).toBe('tacocat');
});
