import { slugify, unslugify } from './utils';

test('slugify to return a slug given a string value', () => {
  let text = 'Hello World';
  let slug = slugify(text);

  expect(slug).toBe('hello-world');

  text = '   Hello, World    ';
  slug = slugify(text);

  expect(slug).toBe('hello-world');

  text = 'HELLO              WoRlD';
  slug = slugify(text);

  expect(slug).toBe('hello-world');
});

test('unslugify to return the original string value of the slug', () => {
  const slug = 'hello-world';
  const text = unslugify(slug);

  expect(text).toBe('Hello World');
});
