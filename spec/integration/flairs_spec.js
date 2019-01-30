const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";

const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

    beforeEach((done) => {
        this.flair;
        sequelize.sync({force: true}).then((res) => {
  
         Flair.create({
           name: "Greased Lightning",
           color: "yellow"
         })
          .then((flair) => {
            this.flair = flair;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
  
        });
  
    });

    describe("GET /flairs", () => {

        it("should return a status code 200 and all flairs", (done) => {

            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Flairs");
                expect(body).toContain("Greased Lightning");
                done();
            });
        });
    });

    describe("GET /flairs/new", () => {

        it("should render a new flair form", (done) => {
          request.get(`${base}new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Flair");
            done();
          });
        });
    
    });

    describe("POST /flairs/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            name: "Yada Yada",
            color: "green"
          }
        };
  
        it("should create a new flair and redirect", (done) => {
  
  //#1
          request.post(options,
  
  //#2
            (err, res, body) => {
              Flair.findOne({where: {name: "Yada Yada"}})
              .then((flair) => {
                expect(res.statusCode).toBe(303);
                expect(flair.name).toBe("Yada Yada");
                expect(flair.color).toBe("green");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    });

});