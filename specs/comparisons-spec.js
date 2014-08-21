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
});