import slugify from 'slugify';
import { unslugify } from './utils';

test('unslugify to return the original string value of the slug', () => {
  let slug = slugify('Hello World');
  let text = unslugify(slug);

  expect(text).toBe('Hello World');

  slug = slugify('    Hello, World     ');
  text = unslugify(slug);

  expect(text).toBe('Hello World');
});
