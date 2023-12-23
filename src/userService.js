const lodash = require("lodash")

const usersList = require("./users.json").users 

// get all users
const getUsers = ()=>{
    return JSON.stringify(usersList)
}

//get a user bu iserId
const getUsersById = (userId, done) => {
    return new Promise( (resolve,reject)=>{
        let user = usersList.find((item)=> item.id === userId)        
        if(!user){
            return done("Requested user doesn't exist..!", null)
        }else{
            return done(null , JSON.stringify(user))
        }
    })
  }

//add user to users.json
const addUser = (newUser, done)=>{
    return new Promise ((resolve,reject)=>{
        let newUserId = `user${Date.now()}`
        let user = usersList.find((item)=> item.id === newUserId ) 
        if(!user){
            newUser.id = newUserId
            usersList.push(newUser)
            resolve(done(null, JSON.stringify(newUser)))
        }else{
            resolve(done("User already exists..!", null))
        }
    })
}

//Update a user
const updateUser = (userId , newData , done)=>{
    return new Promise ((resolve,reject)=>{
        let user = usersList.find((item)=> item.id=== userId)
        if(!user){
            resolve(done("Requested user doesn't exist..!", null))
        }else{
            user.username = newData.username
            user.age = newData.age
            user.hobbies = newData.hobbies
            
            resolve(done(null, JSON.stringify(user)));
        }
    })
}

//delete user
const deleteUser = (userId, done) => {
    return new Promise((resolve,reject)=>{
            let user = usersList.find((item)=> item.id === userId)
            if(!user){
                resolve(done("Requested user doesn't exist..!", null)); 
            }
            else{
                const index = usersList.indexOf(user)
                usersList.splice(index,1)
                // delete a product 
                resolve(done(null, "Deleted !"));
            }
        
    })
  }

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    updateUser,
    deleteUser
}

