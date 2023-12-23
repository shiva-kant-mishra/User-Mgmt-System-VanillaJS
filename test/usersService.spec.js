const { expect } = require("chai");

const userService = require("../src/userService");

describe("Testing userService methods", function () {
  it("Testing get all the users", function (done) {
    let users = JSON.parse(userService.getUsers());

    expect(users).to.be.an("Array");
    expect(users.length).to.be.equal(4);
    expect(users[0].username).to.be.equal("Jack");
    expect(users[1].username).to.be.equal("Jill");
    expect(users[2].username).to.be.equal("Humpty");
    expect(users[3].username).to.be.equal("Dumpty");
    done(null);
  });

  it("Testing get user by Id with valid userId", function (done) {
    userService.getUsersById("user1703341144001", (err, result) => {
      let user = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(user).to.be.an("Object");
      expect(user.id).to.be.equal("user1703341144001");
      expect(user.username).to.be.equal("Jack");
      done(err);
    });
  });

  it("Testing get user by Id with invalid userId", function (done) {
    userService.getUsersById("user123456", (err, result) => {
      expect(err).to.not.be.equal(null);
      expect(err).to.be.equal("Requested user doesn't exist..!");
      done(null);
    });
  });

  it("Testing add user by providing new user details", function (done) {
    let newUser =  {
      "username": "Shiva",
      "age": 29,
      "hobbies": ["Mountaineering","cycling","Reading"]
    }

    userService.addUser(newUser, (err, result) => {
      let user = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(user.username).to.be.equal("Shiva");
      expect(user.age).to.be.equal(29);
      expect(user.hobbies.length).to.be.equal(3);
      done(err);
    });
  });

  it("Test update user with valid userId", function (done) {
    let updateData = {
      "username": "Nishant",
      "age": 22,
      "hobbies": ["sleeping"]
    }

    userService.updateUser("user1703341144002", updateData, (err, result) => {
      let user = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(user.id).to.be.equal("user1703341144002");
      expect(user.username).to.be.equal("Nishant");
      expect(user.age).to.be.equal(22);
      expect(user.hobbies[0]).to.be.equal("sleeping");
      done(err);
    });
  });

  it("Test update user with invalid userId", function (done) {
    let updateData = {
      "username": "Nishant",
      "age": 22,
      "hobbies": ["sleeping"]
    }

    userService.updateUser("user17033", updateData, (err, result) => {
      expect(err).to.be.equal("Requested user doesn't exist..!");
      done(null);
    });
  });

  it("Test delete user with valid userId", function (done) {
    userService.deleteUser("user1703341144003", (err, result) => {

      expect(err).to.be.equal(null);
      expect(result).to.be.equal("Deleted !");
      done(err);
    });
  });

  it("Test delete user with invalid userId", function (done) {
    userService.deleteUser("user1703341", (err, result) => {
      expect(err).to.be.equal("Requested user doesn't exist..!");
      done(null);
    });
  });
});