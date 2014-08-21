var url = require("url");

function responsedWithRedirect(res) {
  return res.statusCode >= 300 && res.statusCode < 400;
}

module.exports = {
  responsedWithRedirect: responsedWithRedirect
};
