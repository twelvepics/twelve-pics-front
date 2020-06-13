const nl2br = (str) => {
  try {
    return str.replace(/(?:\r\n|\r|\n)+/g, '<br />');
  } catch (e) {
    return str; // whatever it is
  }
};

module.exports = { nl2br };
