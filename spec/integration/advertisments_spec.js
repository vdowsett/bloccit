const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

    beforeEach((done) => {
        this.advertisement;
        sequelize.sync({force: true}).then((res) => {
  
         Advertisement.create({
           title: "Show me the money!",
           description: "Gotta get paid by Advertisements"
         })
          .then((advertisement) => {
            this.advertisement = advertisement;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
  
        });
  
      });
    
    describe("GET /advertisements", () => {

        it("should return a status code 200 and all advertisements", (done) => {
            
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Show me the money!");
                done();
            });
        });
    });

    describe("GET /advertisement/new", () => {
        it("should render a new advertisement form", (done) => {
          request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Advertisement");
          done();
        });
       });
     });

    describe("POST /advertisements/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            title: "Morath",
            description: "The attempt logs the ink."
          }
        };
  
        it("should create a new advertisement and redirect", (done) => {
  
          request.post(options,
  
            (err, res, body) => {
              Advertisement.findOne({where: {title: "Morath"}})
              .then((advertisement) => {
                expect(res.statusCode).toBe(303);
                expect(advertisement.title).toBe("Morath");
                expect(advertisement.description).toBe("The attempt logs the ink.");
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

    describe("GET /advertisements/:id", () => {
    it("should render a view with the selected advertisement", (done) => {
        request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Show me the money!");
        done();
        });
    });
    });  
});