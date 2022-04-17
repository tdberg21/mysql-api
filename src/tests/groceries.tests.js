const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Groceries API", () => {
  it("should get all groceries", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/api/groceries")
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.not.be.eql(0);
        done();
      });
  });
  
  it("should get a single grocery", (done) => {
    const expected = {
      id: 1,
      item: 'tacos',
      created_date: '2022-04-16 12:31:26',
      quantity: '1'
    }
    chai
      .request("http://localhost:3000")
      .get("/api/groceries/1")
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.not.be.eql(0);
        expect(res.body[0].name).to.eql('tacos');
        done();
      });
  });
});
