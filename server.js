let express = require("express");
let app = express();

/* handlebars setup */
let path = require("path");
let handlebars = require("express-handlebars");

app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views"
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "hbs");
/* end handlebars setup */


/* setup multer */
let multer = require("multer");
let upload = multer({
    dest:"/uploads/"
});
/* end setup multer */

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index.hbs", {
        data:"this is a string"
    });
});

app.post("/upload", upload.single("somefile"), (req,res)=> {
    console.log(req.body);
    
    console.log(req.body.filetoget);
    res.send(req.file);    

    
});

app.listen(process.env.PORT || 3000, () => {
    console.log("online on port 3000");

})