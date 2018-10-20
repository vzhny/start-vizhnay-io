const slugify = text => {
  checkIfString(text);

  const slug = text
    .trim()
    .toLowerCase()
    .replace(' ', '-');

  return slug;
};

const unslugify = slug => {
  checkIfString(slug);

  const text = slug
    .replace('-', ' ')
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(' ');

  return text;
};

function checkIfString(value) {
  if (typeof value !== String) {
    return new Error('Not a string');
  }
}

export default { slugify, unslugify };
