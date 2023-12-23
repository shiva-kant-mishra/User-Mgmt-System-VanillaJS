const http = require('http')
const PORT = process.env.PORT || 5000

const userService = require("./userService")
const utils = require("./utils")


const server =  http.createServer(async(req,res) =>{
    try{
        //o	GET api/users is used to get all persons 
        if ((req.url === "/api/users") && (req.method === "GET")){
            let users = userService.getUsers()
            res.writeHead(200, { "Content-Type": "application/json"})
            res.end(users)
        }
        //o	GET api/users/{userId} 
        else if ( (req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/)) && (req.method === "GET")){
            const userId = req.url.split("/")[3]
            userService.getUsersById(userId.toLowerCase(), (err,data)=>{
                if(err){
                    res.writeHead(404, { "Content-Type": "application/json" })
                    res.end("User not found")
                }else{
                    res.writeHead(200, { "Content-Type": "application/json" })
                    res.end(data)
                }
            })

        } 

        //o	POST api/users is used to create record about new user and store it in database
        else if( (req.url === "/api/users") && (req.method === "POST")){
            let payload =  await utils.getRequestData(req)
            userService.addUser(JSON.parse(payload), (err,data)=>{
                if(err){
                    res.writeHead(400, { "Content-Type": "application/json" } )
                    res.end(`Unable to Add Product , error :${err}`)
                }else{
                    res.writeHead(201, { "Content-Type": "application/json" } )
                    res.end(data)
                }
            })
        }
        //o	PUT api/users/{userId} is used to update existing user 
        else if( (req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/)) && (req.method === "PUT")){
            let payload = JSON.parse(await utils.getRequestData(req))
            //validate username and age
            if(!payload.username){
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end("Username cannot be empty..!")
            }
            if(!payload.age && !utils.validateNumber(payload.age)){
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end("Username cannot be empty..!")
            }
            const userId = req.url.split("/")[3]
            userService.updateUser(userId.toLowerCase() , payload,(err,data)=>{
                if(err){
                    res.writeHead(404, {"Content-Type" : "application/json"})
                    res.end(err)
                }else{
                    res.writeHead(200, { "Content-Type": "application/json" } )
                    res.end(data)
                }
            })
        }
        //o	DELETE api/users/{userId} is used to delete existing user from database
        else if((req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/)) && (req.method === "DELETE")){
            const userId = req.url.split("/")[3]
            userService.deleteUser(userId.toLowerCase() ,(err,data)=>{
                if(err){
                    res.writeHead(404, { "Content-Type": "application/json" } )
                    res.end(err)
                }else{
                    res.writeHead(204, { "Content-Type": "application/json" } )
                    res.end()
                }
            })
        }
        //Non -existing endpoint
        else{
            res.writeHead(404, { "Content-Type": "application/json" } )
            res.end("Please check endpoint . Not a valid operation...!")
        }
    }catch(error){
        console.log(error)
        res.writeHead(500 , { "Content-Type": "application/json" } )
        res.end("Whoops! Looks like something broke. Give it another shot.​")
    }
})

server.listen(PORT, ()=>{
    console.log(`Listening on Port : ${PORT}`)
})