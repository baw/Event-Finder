var url = require("url");

function isSameHost(href, hostCheck) {
  return href.charAt(0) === "/" || hostCheck.test(href);
}

function isAnEventIndex(href) {
  return href.indexOf("events") !== -1;
}
function isNotSameLink(link1, parsedLink2) {
  var parsedLink1 = url.parse(link1);
  
  return parsedLink1.pathname !== parsedLink2.pathname;
}

function responsedWithRedirect(res) {
  return res.statusCode >= 300 && res.statusCode < 400;
}

module.exports = {
  isSameHost: isSameHost,
  isAnEventIndex: isAnEventIndex,
  isNotSameLink: isNotSameLink,
  responsedWithRedirect: responsedWithRedirect
};
