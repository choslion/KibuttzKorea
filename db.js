var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'kibuttz',
  dateStrings: 'date',
});

// const date = new Date();
// const YMD = date.getDate();

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

function insertLogin(userId, userPw, callback) {
  connection.query(`INSERT INTO loginTable(create_time,userId,userPw) VALUES (NOW(),'${userId}' ,'${userPw}')`, (err) => {
    if (err) throw err;
    callback();
  });
}

function checkLogin(userId, userPw, callback) {
  connection.query(`SELECT * FROM joinTable WHERE userId = '${userId}' and userPw = '${userPw}'`, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}

function insertJoin(userName, userId, userPw, userPwC, birth, address, callback) {
  connection.query(
    `INSERT INTO joinTable(create_time,userName,userId,userPw,userPwC,birth,address) VALUES (NOW(),'${userName}','${userId}' ,'${userPw}','${userPwC}','${birth}','${address}')`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}

function changeDate(callback) {
  connection.query(`SELECT DATE_FORMAT(NOW(),'%y-%m-%d' AS DATE FROM DUAL`, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}

function getMemo(callback) {
  connection.query('SELECT * FROM kibuttzTable ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}
// 작성페이지에서 작성할때 데이터베이스에 정보가 들어가게해주는 함수
function insertMemo(title, author, content, callback) {
  connection.query(`INSERT INTO kibuttzTable(title,author,create_time,content,num) VALUES ('${title}','${author}',NOW(),'${content}' , 0)`, (err) => {
    if (err) throw err;
    callback();
  });
}

// 수정페이지 안에있는 수정버튼을 눌렀을때 업데이트가 되게하는 함수.
function updateMemos(setId, title, author, content, callback) {
  connection.query(`UPDATE kibuttzTable SET title= '${title}', author= '${author}' , create_time = NOW(), content= '${content}' WHERE id = ${setId}`, (err) => {
    if (err) throw err;
    callback();
  });
}

// 메모중에 id 가 일치하는 데이터만 추출 공지를 선택할때 쓰는함수
function getMemoById(id, callback) {
  connection.query(`SELECT * FROM kibuttzTable WHERE id = ${id}`, (err, row) => {
    if (err) throw err;
    callback(row);
  });
}

// 공지사항 삭제버튼 누를때 쓰는함수
function deleteById(id, callback) {
  connection.query(`DELETE FROM kibuttzTable WHERE id = ${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}

function countNum(id, callback) {
  connection.query(`UPDATE kibuttzTable SET num = num+1 WHERE id = ${id}`, (err, row) => {
    if (err) throw err;
    callback();
  });
}

function getProduct(callback) {
  connection.query('SELECT * FROM productTable ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}

function insertProduct(img, productName, productPrice, productDetail, callback) {
  connection.query(`INSERT INTO productTable(create_time,img,productName,productPrice,productDetail) VALUE(NOW(),'${img}','${productName}','${productPrice}','${productDetail}')`, (err) => {
    if (err) throw err;
    callback();
  });
}

function updateProduct(setId, img, productName, productPrice, productDetail, callback) {
  connection.query(
    `UPDATE productTable SET create_time = NOW() , img = '${img}' , productName = '${productName}' , productPrice = '${productPrice}' , productDetail = '${productDetail}' WHERE id = ${setId}`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}

function getProductById(id, callback) {
  connection.query(`SELECT * FROM productTable WHERE id = ${id}`, (err, row) => {
    if (err) throw err;
    callback(row);
  });
}

function deleteProduct(id, callback) {
  connection.query(`DELETE FROM productTable WHERE id = ${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}

function deleteProductById(id, callback) {
  connection.query(`DELETE FROM productTable WHERE id = ${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}

module.exports = {
  insertLogin,
  checkLogin,
  insertJoin,
  getMemo,
  insertMemo,
  updateMemos,
  getMemoById,
  deleteById,
  countNum,
  changeDate,
  getProduct,
  insertProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  deleteProductById,
};
