const fetch = require('cross-fetch');

const API_URL = 'https://api.stackexchange.com/search/advanced';
const SITE_DOMAIN = 'stackoverflow.com';

module.exports = function (req, res) {
  const message = req.query['q'];
  const keywords = extractKeywords(message);

  fetch(`${API_URL}?site=${SITE_DOMAIN}&q=${keywords}`)
    .then((apires) => {
      if (apires.status >= 400) {
        throw new Error('Bad response from server');
      }
      return apires.json();
    })
    .then((data) => {
      res.json(extractAnswer(data));

    })

};

function extractKeywords(message) {
  // TODO: Implement keyword extraction logic here
  return message;
}

function extractAnswer(data) {
  // TODO: Implement answer extraction logic here
  return data;
}
