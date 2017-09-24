var fs = require('fs');
//var stream = fs.createWriteStream("my_file.txt");

//write
// stream.once('open', function(fd) {
//   stream.write("My 1st row\n");
//   stream.write("My second row\n");
//   stream.end();
// });

// var index = 0;
//
// function read(file, callback) {
//     return fs.readFile(file, 'utf8', function(err, data) {
//         if (err) {
//             console.log(err);
//         }
//         callback(data)
//     });
// }
//
// var output = read('my_file.txt', function (data) {
//   console.log(index);
//   console.log(data);
//   index ++;
// });
//
// console.log(output);

//log the elements in the txt file
// for(i in array) {
//     console.log(array[i]);
// }

//read
var fs = require('fs');
var array = fs.readFileSync('my_file.txt').toString().split("\n");
for(i in array) {
    console.log(array[i]);
}

console.log(array);
