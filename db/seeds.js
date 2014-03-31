var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

console.log('Connecting to MongoDB');
MongoClient.connect('mongodb://localhost/pm', function(err, db){

    db.collection('users').drop();
    db.collection('projects').drop();

    db.collection('users').insert({
        user_name : 'admin',
        password_hash : (crypto.createHash('sha256').update('123456')).digest('hex'),
        role : 'administrator',
        recovery_token : '',
        user_details :
        {
            name : 'default admin',
            email_address: 'default_admin@example.com'
        },
        description : 'default administrative user',
        login_count : 0,
        created_at : (new Date()).getDate()
    }, function(err, result){
        if (err) return;

        db.collection('users').insert({
            user_name : 'developer',
            password_hash : (crypto.createHash('sha256').update('654321')).digest('hex'),
            role : 'developer',
            recovery_token : '',
            user_details :
            {
                name : 'default developer',
                email_address: 'default_developer@example.com'
            },
            description : 'default developer user',
            login_count : 0,
            created_at : (new Date()).getDate()
        }, function(err, result_2){

            db.collection('projects').insert({
                name: "default project",
                start_date: new Date(),
                end_date: null,
                description: "default project description",
                users: [result[0]._id],
                tasks: new Array()
            }, function(err, pResult){
                db.close();
                console.log('Done adding data to database');
            });
        });
    });
});