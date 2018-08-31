const path = require('path');
const express = require('express')

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

//express conf
const app = express(); 
app.use(express.static(publicPath));
app.listen(PORT,() => {
    console.info('Server started at '+PORT);
});


//app routes or APIs
app.get('/hello', function (req, res) {
  res.send('Hello World')
});
 



