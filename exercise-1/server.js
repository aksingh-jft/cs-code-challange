const express= require('express');
const app =express();
const port =3000;
const hbs= require('express-handlebars');
const path=require('path')

app.engine('.hbs', hbs({
    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/')
  }));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));

app.use('/views',express.static(path.join(__dirname,'views')))
app.use('/public',express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`Server Started on Port : ${port} `)
})