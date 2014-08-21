var url = require("url");

var comp = require("../lib/comparisons.js");

describe("comparsions: ", function () {
  describe("responsedWithRedirect", function () {
    it("should be true when status code is between 300 and 400", function () {
      var res300 = { statusCode: 300 };
      var res301 = { statusCode: 301 };
      var res304 = { statusCode: 304 };
      var res320 = { statusCode: 320 };
      var res358 = { statusCode: 358 };
      
      expect(comp.responsedWithRedirect(res300)).toBe(true);
      expect(comp.responsedWithRedirect(res301)).toBe(true);
      expect(comp.responsedWithRedirect(res304)).toBe(true);
      expect(comp.responsedWithRedirect(res320)).toBe(true);
      expect(comp.responsedWithRedirect(res358)).toBe(true);
    });
    
    it("should be false when status is not between 300 and 400", function () {
      var res104 = { statusCode: 104 };
      var res200 = { statusCode: 200 };
      var res400 = { statusCode: 400 };
      var res404 = { statusCode: 404 };
      var res501 = { statusCode: 501 };
      
      expect(comp.responsedWithRedirect(res104)).toBe(false);
      expect(comp.responsedWithRedirect(res200)).toBe(false);
      expect(comp.responsedWithRedirect(res400)).toBe(false);
      expect(comp.responsedWithRedirect(res404)).toBe(false);
      expect(comp.responsedWithRedirect(res501)).toBe(false);
    });
  });
  
  describe("isNotSameLink", function () {
    var link1;
    var link2;
    
    var parsedLink1;
    var parsedLink2;
    
    beforeEach(function () {
      link1 = "http://google.com";
      link2 = "http://gmail.com";
      
      parsedLink1 = url.parse(link1);
      parsedLink2 = url.parse(link2);
    });
    
    it("should return true for different links", function () {
      expect(comp.isNotSameLink(link1, parsedLink2)).toBe(false);
      expect(comp.isNotSameLink(link2, parsedLink1)).toBe(false);
    });
    
    it("should return false for the same links", function () {
      expect(comp.isNotSameLink(link1, parsedLink1)).toBe(false);
      expect(comp.isNotSameLink(link2, parsedLink2)).toBe(false);
    });
  });
  
  describe("isAnEventIndex", function () {
    it("doesn't include 'events'", function () {
      expect(comp.isAnEventIndex("http://google.com")).toBe(false);
    });
    
    it("inlcudes 'events'", function () {
      expect(comp.isAnEventIndex("http://events.stanford.edu")).toBe(true);
    });
  });
  
  describe("isAnEventLink", function () {
    it("includes 'event' and numbers", function () {
      expect(comp.isAnEventLink("http://www.sfmoma.org/exhib_events/exhibitions/513")).toBe(true);
    });
    
    it("doesn't include 'event' and numbers", function () {
      expect(comp.isAnEventLink("http://google.com")).toBe(false);
    });
  });
