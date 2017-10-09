let express = require("express");

let bodyParser = require("body-parser");
let path = require("path");
let handlebars = require("express-handlebars");
let multer  = require('multer')
let fs = require("fs");
let logger = require("morgan");

let app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/* setup multer */
function checkSize() {
    
}
let upload = multer({ 
    dest:"uploads/", 
    limits: {
        fileSize:500,
    }, 
    
})
/* end setup multer */

/* handlebars setup */
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views"
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs");
/* end handlebars setup */

app.get("/", (req, res) => {
    res.render("index.hbs", {
        instructions: "due to server's limit, max capacity is reduced to 499 bytes. ",
        title:"Image metadata microservice",
        text:"Get the size of the uploaded file in bytes"
    });
});

app.post('/upload', upload.single('filetoget'), function (req, res, next) {
    // req.file is the `filetoget` file 
    console.log(req.file);
    if(req.file.size <= 500 || req.file.mimetype === "text/plain") {
        res.json({
            size:req.file.size
        });
    }
    else {
        res.json({
            status: "error",
            error: "file to large, max size 500 or not in correct format (.txt only)"
        });
    }
    // req.body will hold the text fields, if there were any 
  });

  app.get("/delete", (req,res)=> {
    fs.unlink(path.join(__dirname + "/*"), ()=> {
        res.redirect("/");
    });

  });

app.listen(process.env.PORT || 3000, () => {
    console.log("online on port 3000");

})