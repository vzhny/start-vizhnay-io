import slugify from 'slugify';
import { unslugify, getGreetingTester } from './utils';

test('unslugify to return the original string value of the slug', () => {
  let slug = slugify('Hello World');
  let text = unslugify(slug);

  expect(text).toBe('Hello World');

  slug = slugify('    Hello, World     ');
  text = unslugify(slug);

  expect(text).toBe('Hello World');
});

test('getGreeting returns the correct greeting based on the time of day', () => {
  const hoursToTest = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];

  hoursToTest.map(hour => {
    const greeting = getGreetingTester(hour);

    if (hour >= 6 && hour < 12) {
      expect(greeting).toBe('Good Morning!');
    } else if (hour >= 12 && hour < 18) {
      expect(greeting).toBe('Good Afternoon!');
    } else {
      expect(greeting).toBe('Good Evening!');
    }
  });
});
