var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

console.log('Connecting to MongoDB');
MongoClient.connect('mongodb://root:mylordjesus@localhost/pm', function(err, db){

    db.collection('users').drop();

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
        console.log('Done seeding MongoDB 1');
    });

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
    }, function(err, result){
        db.close();
        console.log('Done seeding MongoDB 2');
    });
});

/*console.log('Seed MongoDB with default user');
User.create({
    user_name : 'admin',
    password_hash : shasum.digest('hex'),
    role : 'administrator',
    recovery_token : '',
    user_details :
    {
        name : 'default user',
        email_address: 'default_user@example.com'
    },
    description : 'default administrative user',
    login_count : 0,
    created_at : (new Date()).getDate()
}, function(err){
    console.log(err);
    if (!err)
        console.log('default user has just been inserted');
});*/