//import the User model
const User = require('../models/userModel');
const assert = require('assert');
  
let user;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of User Model
    user = new User({ email: 'karl@example.com', password: "test123" });
    user.save()
        .then(() => done());
});

describe('Creating documents in MongoDB', () => {
    it('Creates a New User', (done) => {
        const newUser = new User({ email: 'karl@example.com', password: "test123" });
        newUser.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newUser.isNew);
                done();
            });
    });
});
  
describe('Reading Details of User', () => {
    it('Finds user with the email', (done) => {
        User.findOne({ email: 'karl@example.com' })
            .then((user) => {
                assert(user.email === 'karl@example.com');
                done();
            });
    })
})

describe('Updating a user', () => { 
    // Handling Redundant Code
    // function helperFunc(assertion, done) {
    // assertion
    //     .then(() => User.find({}))
    //     .then((users) => {
    //         assert(users.length === 1);
    //         assert(users[0].name === 'Updated Shriyam');
    //         done();
    //     });
    // }
  
    // it('Sets and saves a user using an instance', (done) => {
    //     Not yet updated in MongoDb
    //     user.set('email', 'kev@example.com');
    //     helperFunc(user.save(), done);
    // });
    it('Sets and saves a user using an instance', (done) => {
        user.set('email', 'kev@example.com')
        done();
            // .then(() => User.findOne({ email: 'kev@example.com' }))
            // .then((user) => {
            //     assert(user.email == 'kev@example.com');
            //     done();
            // });
    });
  
    // it('Update a user using instance', (done) => {
    //     helperFunc(user.update({ email: 'kev@example.com' }), done);
    // });
});

describe('Deleting a user', () => {
    
    it('removes a user using its instance', (done) => {
    user.remove({ email: 'karl@example.com' })
        .then(() => User.findOne({ email: 'karl@example.com' }))
        .then((user) => {
            assert(user == null);
            done();
        });
    });

    it('removes multiple users', (done) => {
    user.remove({ email: 'karl@example.com' })
      .then(() => User.findOne({ email: 'karl@example.com' }))
      .then((user) => {
        assert(user === null);
        done();
      });
    });

    it('finds and removes a user', (done) => {
    User.findOneAndRemove({ email: 'karl@example.com' })
      .then(() => User.findOne({ email: 'karl@example.com' }))
      .then((user) => {
        assert(user === null);
        done();
      });
    });
});


