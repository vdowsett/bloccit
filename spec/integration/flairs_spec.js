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
  
          request.post(options,
  
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

    describe("GET /flairs/:id", () => {

        it("should render a view with the selected flair", (done) => {
          request.get(`${base}${this.flair.id}`, (err, res, body) => {
              console.log("balls: " + this.flair.id )
            expect(err).toBeNull();
            expect(body).toContain("Greased Lightning");
            done();
          });
        });
   
    });

    describe("POST /flairs/:id/destroy", () => {

        it("should delete the flair with the associated ID", (done) => {
   
          Flair.all()
          .then((flairs) => {
   
            const flairCountBeforeDelete = flairs.length;
   
            expect(flairCountBeforeDelete).toBe(1);
   
            request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
              Flair.all()
              .then((flairs) => {
                expect(err).toBeNull();
                expect(flairs.length).toBe(flairCountBeforeDelete - 1);
                done();
              })
   
            });
          });
   
        });
   
    });

});