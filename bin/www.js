//  실행폴더 bin
let app = require('../app');

let PORT = process.env.PORT || 3005;
// let PORT = 3005;

// app.listen(process.env.PORT || PORT);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 로 실행`);
});

//
// app.listen(PORT, () => {
//   console.log(`${PORT} 로 express 실행`);
// });
