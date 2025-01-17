const express=require('express');
const connectDb=require('./config/db');
const path=require('path');

//Connect Database
connectDb();

const app=express();

app.use(express.json({extended:false}));

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=> console.log(`Server Started at Post ${PORT}`));