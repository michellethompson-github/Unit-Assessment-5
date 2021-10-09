const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = await req.app.get('db');
        db.helo_users.find({
            username: req.body.username
        }).then(user => {
            // User Exists
            if(user.length > 0) {
                res.status(409).send({error: "user already exists"});
            }
            // User Does not Exists
            else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.password, salt);
                db.user.create_user(req.body.username, hash, `https://robohash.org/${req.body.username}.png`)
                .then((user) => {
                    req.session.user = user[0];
                    res.status(200).send({data: user[0], success: "user created"});
                })
            }
        })
    },

    login: async (req, res) => {
        const db = await req.app.get('db');
        db.helo_users.find({
            username: req.body.username
        }).then(user => {
            // User Exists
            if(user.length > 0) {

                let isAuthenticated = bcrypt.compareSync(req.body.password, user[0].password)
                if(!isAuthenticated) {
                    res.status(403).send({error: "username or password in incorrect"});
                }
                else {
                    req.session.user = user[0];
                    res.status(200).send({data: user[0], success: "login successful"})
                }                
            }
            // User Does not Exists
            else {
                res.status(422).send({error: "user does not exists"});
            }
        })
    },

    logout: async (req, res) => {
        req.session.destroy();
        res.status(200).send({success: "user logged out"});
    },

    getUser: async (req, res) => {
        // User is Logged In
        if(req.session.user) {
            console.log('session found')
            res.status(200).send({data: req.session.user});
        }
        // No Logged in User
        else {
            console.log('no session found')
            res.status(404).send({error: "no session found"});
        }
    }

}