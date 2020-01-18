var path=require('path');
var currentPath=path.resolve(__dirname)
var child_process = require('child_process');

var child = child_process.fork(`${currentPath}/child.js`);

child.on('message', function(m){
    console.log('message from child: ' + JSON.stringify(m));
});

child.send({from: 'parent'});