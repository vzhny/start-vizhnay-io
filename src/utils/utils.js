module.exports.unslugify = slug => {
  checkIfString(slug);

  const text = slug
    .replace('-', ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(' ');

  return text;
};

function checkIfString(value) {
  if (typeof value !== 'string') {
    return new TypeError('Not a string');
  }
}
