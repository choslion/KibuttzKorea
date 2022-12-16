//  실행폴더 bin
let app = require("../app");

let port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`${port} 로 express 실행`);
});
//  실행파일

//
