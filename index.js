var http = require("http");
var url = require("url");

//External Libraries
var cheerio = require("cheerio");

//Project Libraries
var comp = require("./lib/comparisons.js");

//Constants
var NUMBER_OF_EVENT_LINKS_TO_SHOW = 10;

//Only run from command line
if (require.main === module) {
  console.log("Enter a event url to look up new events");
  
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var link = process.stdin.read();
    
    if (link !== null) {
      console.log("Loading Events...");
      loadPage(link, NUMBER_OF_EVENT_LINKS_TO_SHOW, findEvents);
      
      process.stdin.end();
    }
  });

  process.stdin.on('end', function() {
    process.stdout.write('end');
  });
}

function loadPage(link, num, cb) {
  var parsedUrl = url.parse(link);
  
  http.get({
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      protocol: parsedUrl.protocol || "http:"
    }, function (res) {
    var data = "";
    
    res.on("data", function (chunk) {
      data += chunk;
    });
    
    res.on("end", function () {
      if (comp.responsedWithRedirect(res)) {
        var location = res.headers["location"];
        
        loadPage(location, num, cb);
      } else {
        var $ = cheerio.load(data);
        link = url.parse(link);
        
        cb(num, $, link);
      }
    }).on("error", function (e) {
      console.error("Error message: " + e.message);
    });
  });
}

function findEvents(num, $, link) {
  var links = $("a");
  var hostCheck = new RegExp("^http:\\/\\/" + link.hostname);
  
  var eventIndex = [];
  links = links.filter(function (index, el) {
    var $this = $(el);
    if ($this.attr("href") === undefined) {
      return false;
    }
    
    if ($this.attr("href").charAt(0) === "/") {
      $this.attr("href", link.protocol + "//" + link.hostname + this.attribs.href);
    }
    
    var href = $this.attr("href").replace(/#.*/, "");
    if (comp.isSameHost(href, hostCheck)) {
      if ((comp.isAnEventLink(href) && comp.isNotSameLink(href, link))) {
        return true;
      } else if (comp.isAnEventIndex(href)) {
        eventIndex.push(href);
      }
    }
  });
  
  if (links.length < num  && eventIndex.length > 0) {
    loadPage(eventIndex[0], num - links.length, findEvents);
  }
  
  for (var i = 0; i < num && i < links.length; i++) {
    console.log(links.get(i).attribs.href);
  }
}
