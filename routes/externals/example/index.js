console.log('example\'s controllers have just been loaded!');

exports.index = function(req, res, next) {
    res.json({ example: 'test' });
}
