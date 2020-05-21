const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://admin_:8903410010@cluster0-ws2zd.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("DB connected") }).catch((err) => { console.log(err) });

const dataSchema = new mongoose.Schema({
    name: "String",
    team: "String"
});

var User = mongoose.model("User", dataSchema);

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('views'));

app.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs', { users: data });
        }
    })

})

app.post('/test', (req, res) => {
    var newUser = new User({
        name: req.body.name,
        team: req.body.team
    }).save().then(saveData => console.log("data save", saveData)).catch((err) => console.log(err));
    res.redirect('/');
})

app.listen(8000, () => {
    console.log('Server started at 8000');
})