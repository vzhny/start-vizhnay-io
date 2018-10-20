module.exports.slugify = text => {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(' ', '-');
  return slug;
};

module.exports.unslugify = slug => {
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
