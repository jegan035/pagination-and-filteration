const express = require('express');
const app = express();
const bodyparser = require('body-parser'); 
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv/config');

app.use(cors());
app.options('*',cors())


//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));



const data={
    users:[
        {
        name:"John",
        email:"john123@gmail.com",
        phone:"12345",
        task:"task 1",
        id:1,
        status:"Completed"
        },
        {
            name:"James",
            email:"james123@gmail.com",
            phone:"1324234",
            task:"task 2",
            id:2,
            status:"InCompleted"
        },
        {
            name:"Mikey",
            email:"mikey123@gmail.com",
            phone:"1231421",
            task:"task 3",
            id:3,
            status:"Completed"
        },
        {
            name:"Arun",
            email:"arun123@gmail.com",
            phone:"2235352",
            task:"task 4",
            id:4,
            status:"InCompleted"
        },
        {
            name:"Lester",
            email:"lester@gmail.com",
            phone:"12345",
            task:"task 1",
            id:5,
            status:"Completed"
        },
        {
            name:"Trevor",
            email:"trevor123@gmail.com",
            phone:"213821",
            task:"task 2",
            id:6,
            status:"Completed"
        },
        {
            name:"Mikel",
            email:"mikel123@gmail.com",
            phone:"8646546",
            task:"task 1",
            id:7,
            status:"InCompleted"
        },
        {
            name:"Hina",
            email:"hina123@gmail.com",
            phone:"901239",
            task:"task 5",
            id:8,
            status:"Completed"
        },
        {
            name:"Kong",
            email:"kong123@gmail.com",
            phone:"717273",
            task:"task 2",
            id:9,
            status:"InCompleted"
        },
        {
            name:"Deepak",
            email:"deepak123@gmail.com",
            phone:"8812138",
            task:"task 4",
            id:10,
            status:"Completed"
        },
        {
            name:"Hardin",
            email:"hardin123@gmail.com",
            phone:"7863127",
            task:"task 1",
            id:11,
            status:"InCompleted"
        },
        {
            name:"Tessa",
            email:"tessa123@gmail.com",
            phone:"7236712",
            task:"task 2",
            id:12,
            status:"InCompleted"
        },
        {
            name:"Nick",
            email:"nick123@gmail.com",
            phone:"72173128",
            task:"task 2",
            id:13,
            status:"Completed"
        },
        {
            name:"Noah",
            email:"noah123@gmail.com",
            phone:"1283718",
            task:"task 3",
            id:14,
            status:"InCompleted"
        },
        {
            name:"Manji",
            email:"manji123@gmail.com",
            phone:"9892131",
            task:"task 1",
            id:15,
            status:"Completed"
        }
        
       
    ]
}
app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 10; 
    const query = req.query.q;
    const statusFilter = req.query.status; 
  
    let filteredUsers = data.users;
  
    
    if (query) {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
  
    
    if (statusFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.status.toLowerCase() === statusFilter.toLowerCase();
      });
    }
  
    
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
  
   
    const usersForPage = filteredUsers.slice(startIndex, endIndex);
  
    res.json({
      totalUsers: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / perPage),
      currentPage: page,
      users: usersForPage,
    });
  });
  
  

mongoose.connect(process.env.CONNECTION_STRING)

.then(()=>{
    console.log('Database is connected...');
})
.catch((err)=>{
    console.log(err);
})

 app.listen(4000,()=>{
    console.log('server is running http://localhost:4000');
 })