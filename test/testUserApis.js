const chai =  require('chai');
const app = require('../index');
const { expect } = chai;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("test", () => {
    it("Tests welcome app message", done => {
        chai
            .request(app)
            .get("/api")
            .end((error, response) => {
                expect(response).to.have.status(200);
                done();
            });
    });
});