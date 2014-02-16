function create_socket(app)
{
    return require('socket.io').listen(app);
}

function bind_events(io)
{
    io.sockets.on('connection', function(socket){
        console.log('socket connection established');
        socket.emit('connection_established', { data : 'connection established'});
    })
}

var socket_init = create_socket,
    socket_bind = bind_events

module.exports.SocketInit = socket_init;
module.exports.SocketBind = socket_bind;