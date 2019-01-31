const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user
        
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
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

    it("should return array of posts within topic in scope", (done) => {

      this.topic.getPosts()     //returns an array of Sequelize Model instances
      .then((posts) => {
        expect(posts[0].topicId).toBe(this.topic.id);
        done();
      })
      .catch((err) => {
        console.log(this.topic.posts);
        console.log(err);
        done();
      })

    })
  })

    
  
});