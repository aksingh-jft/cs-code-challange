let main = require('../public/js/main');
describe("Test Main Javascript file", function () {

    it("should fetch data", function () {
        const data = main.fetchData();
        expect(main.fetchData).toBeCalled
        expect(data.length).toBeGreaterThan(0)
    });
    it("should get Template", function () {
        const data = main.GetHBS();
        expect(main.GetHBS).toBeCalled();
    });
});