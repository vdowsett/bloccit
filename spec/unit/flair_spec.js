const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

    Topic.create({
        title: "Jack of All Trades Master of None",
        description: "Meaning: Having suitable skill in multiple things, but not being an expert in any of them."
    })
    .then((topic) => {
        this.topic = topic;

        Post.create({
            title: "Knuckle Down",
            body: "Meaning: Getting sincere about something; applying oneself seriously to a job.",
            topicId: this.topic.id
        })
        .then((post) => {
            this.post = post;

            Flair.create({
            name: "Lickety Split",
            color: "green",
            postId: this.post.id
            })
            .then((flair) => {
            this.flair = flair;
            done();
            });
        })

        .catch((err) => {
            console.log(err);
            done();
            });
        })
    .catch((err) => {
        console.log(err);
        done();
        });

    });

  });

  describe("testing beforeEach() above", () => {

    it("should run the before each with a topic, post and new flair before each test", (done) => {

        console.log("balls" + this.topic.title);
        console.log("balls" + this.post.title);
        console.log("balls" + this.topic.title);
        
            expect(this.topic.title).toBe("Jack of All Trades Master of None");
            expect(this.post.title).toBe("Knuckle Down");
            expect(this.flair.name).toBe("Lickety Split");

            done();

    });
  });

  describe("#create()", () => {

    it("should create a flair object with a name and color, and assigned a post", (done) => {

      Flair.create({
        name: "Ride Him, Cowboy!",
        color: "blue",
        postId: this.post.id
      })
      .then((flair) => {

        expect(flair.name).toBe("Ride Him, Cowboy!");
        expect(flair.color).toBe("blue");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#setPost()", () => {

    it("should associate a post and a flair together", (done) => {

      Post.create({
        title: "Barking Up The Wrong Tree",
        body: "Meaning: To make a wrong assumption about something.",
        topicId: this.topic.id
      })
      .then((newPost) => {

        expect(this.flair.postId).toBe(this.post.id);

        this.flair.setPost(newPost)
        .then((flair) => {

          expect(flair.postId).toBe(newPost.id);
          done();

        });
      })
    });

  });

  describe("#getPost()", () => {

    it("should return the associated post", (done) => {

      this.flair.getPost()
      .then((associatedPost) => {
        expect(associatedPost.title).toBe("Knuckle Down");
        done();
      });

    });

  });

  
});