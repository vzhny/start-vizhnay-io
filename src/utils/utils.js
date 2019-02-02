import getHours from 'date-fns/get_hours';

export const unslugify = slug => {
  checkIfString(slug);

  const text = slug
    .replace('-', ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(' ');

  return text;
};

export const getGreeting = () => {
  const currentHour = getHours(new Date());
  let greeting = 'Good Evening!';

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good Morning!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon!';
  }

  return greeting;
};

export const getGreetingTester = hour => {
  let greeting = 'Good Evening!';

  if (hour >= 6 && hour < 12) {
    greeting = 'Good Morning!';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon!';
  }

  return greeting;
};

function checkIfString(value) {
  if (typeof value !== 'string') {
    return new TypeError('Not a string');
  }
}
