var url = require("url");

function isNotSameLink(link1, parsedLink2) {
  var parsedLink1 = url.parse(link1);
  
  return parsedLink1.pathname !== parsedLink2.pathname;
}

function responsedWithRedirect(res) {
  return res.statusCode >= 300 && res.statusCode < 400;
}

module.exports = {
  isNotSameLink: isNotSameLink,
  responsedWithRedirect: responsedWithRedirect
};
