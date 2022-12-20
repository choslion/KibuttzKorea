//  실행폴더 bin
let app = require('../app');

// let PORT = process.env.PORT || 3005;
let PORT = 3005;

// app.listen(PORT, () => {
//   console.log(`${PORT} 로 express 실행`);
// });
//  실행파일

//
app.listen(process.env.PORT || PORT);
// app.listen(PORT, () => {
//   console.log(`${PORT} 로 express 실행`);
// });
