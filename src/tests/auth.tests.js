const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Auth Services", () => {
  it.skip("should POST a new user", (done) => {
    const fakeUser = {
      username: "Sterling Arthur4",
      password: "turtleneck4",
      email: "sterling4@spys.com",
    };

    const expectedResponse = [
      {
        username: "Sterling Arthur4",
        email: "sterling4@spys.com",
      },
    ];

    chai
      .request("http://localhost:3000")
      .post("/api/auth/register")
      .send(fakeUser)
      .end((err, resp) => {
        console.log(resp.body);
        console.log(expectedResponse[0].username);
        expect(resp.body[0].username).to.eql(expectedResponse[0].username);
        done();
      });
  });
  it("should not POST a user if any required information is missing", (done) => {
    const expectedMessage = {
      error: { msg: "Password required!" },
    };
    chai
      .request("http://localhost:3000")
      .post("/api/auth/register")
      .end((err, resp) => {
        console.log(resp.body);
        expect(resp.body).to.eql(expectedMessage.error);
        done();
      });
  });
});
