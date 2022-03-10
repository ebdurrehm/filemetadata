const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest:'public/uploads'});

require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//handle file upload
app.post('/api/fileanalyse', upload.single('upfile'),(req,res)=>{
  console.log(req.file);
  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const mimeType = req.file.mimetype;

  res.json({"name":fileName, "type":mimeType, "size":fileSize});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
