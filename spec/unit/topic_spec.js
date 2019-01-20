const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {


      Topic.create({
        title: "This is a Japanese doll.",
        description: "We need to rent a room for our party."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "How was the math test?",
          body: "The old apple revels in its authority.",

          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {

      Topic.create({
        title: "This is a Japanese doll.",
        description: "We need to rent a room for our party."
      })
      .then((topic) => {

        expect(topic.title).toBe("This is a Japanese doll.");
        expect(topic.description).toBe("We need to rent a room for our party.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or description", (done) => {
      Topic.create({
        title: "This is a Japanese doll."
      })
      .then((topic) => {
 
       // the code in this block will not be evaluated since the validation error
       // will skip it. Instead, we'll catch the error in the catch block below
       // and set the expectations there
 
        done();
 
      })
      .catch((err) => {
 
        expect(err.message).toContain("Topic.description cannot be null");
        done();
 
      })
    });

  });

  describe("#getPost()", () => {

    //1. find topic in scope

    //2. create post and associate with topic in scope

    //3. create getPost method that reruns array of post objects associated with the topic method it was called on

    //4. expect associated post created in step 1 is returned
    
  })
  
});