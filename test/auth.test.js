const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../bin/www")

// Assertion style
chai.should()

chai.use(chaiHttp)


describe("Auth api", ()=>{
    // Testing the get route
    describe("Get auth/sign_in", ()=>{
        it("it should get an error message", done =>{
            chai.request(server)
            .post("/auth/sign_in")
            .send({
                "email":"jesnal3@mailinator.com",
                "password":"12345"
            })
            .end((err, response)=>{
                console.log("body",response.body)
                response.should.have.status(401);
                response.body.should.be.a("object");
                response.body.should.have.property("status").eql("failed");

                done();
            })
        })
        it("it should get an success message", done =>{
            chai.request(server)
            .post("/auth/sign_in")
            .send({
                "email":"jesnal3@mailinator.com",
                "password":"123456"
            })
            .end((err, response)=>{
                console.log(response.body)
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("status").eql("success");
                response.body.should.have.property("token").be.a('string');
                response.body.should.have.property("token");
                done();
            })
        })
    })
})