var url = require("url");

function _hasTrailingSlash(url) {
  return url.pathname.charAt(url.pathname.length - 1) === "/";
}

function isSameHost(href, hostCheck) {
  return href.charAt(0) === "/" || hostCheck.test(href);
}

function isAnEventLink(href) {
  return href.search(/(?!\.)events?\//) !== -1 && href.search(/\d/) !== -1;
}

function isAnEventIndex(href) {
  return href.indexOf("events") !== -1;
}
function isNotSameLink(link1, parsedLink2) {
  var parsedLink1 = url.parse(link1);
  
  //Check to see if one has a trailing slash while the other doesn't
  var extraSlash1 = "", extraSlash2 = "";
  if (_hasTrailingSlash(parsedLink1) && !_hasTrailingSlash(parsedLink2)) {
    extraSlash2 = "/";
  } else if (_hasTrailingSlash(parsedLink2) && !_hasTrailingSlash(parsedLink1)) {
    extraSlash1 = "/";
  }
  
  return parsedLink1.pathname + extraSlash1 !== parsedLink2.pathname + extraSlash2;
}

function responsedWithRedirect(res) {
  return res.statusCode >= 300 && res.statusCode < 400;
}

module.exports = {
  isAnEventLink: isAnEventLink,
  isSameHost: isSameHost,
  isAnEventIndex: isAnEventIndex,
  isNotSameLink: isNotSameLink,
  responsedWithRedirect: responsedWithRedirect
};
