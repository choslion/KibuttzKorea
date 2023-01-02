var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'kibuttz.cww5pc03lwfy.ap-northeast-2.rds.amazonaws.com',
  user: 'root',
  password: 'cw2688hw',
  database: 'kibuttz',
  dateStrings: 'date',
  multipleStatements: true,
});

// const date = new Date();
// const YMD = date.getDate();

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

function insertLogin(userId, userPw, callback) {
  connection.query(`INSERT INTO logintable(create_time,userId,userPw) VALUES (NOW(),'${userId}' ,'${userPw}')`, (err) => {
    if (err) throw err;
    callback();
  });
}
// 먼저 선언한 쿼리문 다음 세미콜론 하고 뒤에 + 'SELECT * FROM tablename.... ' 으로 다른쿼리를 붙일 수 있다.
//  let rows0 = rows[0];
//  let rows1 = rows[1];
// callback(rows0,rows1); 이렇게 보내주면 된다.

function checkLogin(userId, userPw, callback) {
  connection.query(`SELECT * FROM jointable WHERE userId = '${userId}' and userPw = '${userPw}'`, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}

function insertJoin(userName, userId, userPw, userPwC, userMail, userNumber, callback) {
  connection.query(
    `INSERT INTO jointable(create_time,userName,userId,userPw,userPwC,userMail,userNumber) VALUES (NOW(),'${userName}','${userId}' ,'${userPw}','${userPwC}','${userMail}','${userNumber}')`,
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
  connection.query('SELECT * FROM kibuttztable ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}
// 작성페이지에서 작성할때 데이터베이스에 정보가 들어가게해주는 함수
function insertMemo(title, author, content, callback) {
  connection.query(`INSERT INTO kibuttztable(title,author,create_time,content,num) VALUES ('${title}','${author}',NOW(),'${content}' , 0)`, (err) => {
    if (err) throw err;
    callback();
  });
}

// 수정페이지 안에있는 수정버튼을 눌렀을때 업데이트가 되게하는 함수.
function updateMemos(setId, title, author, content, callback) {
  connection.query(`UPDATE kibuttztable SET title= '${title}', author= '${author}' , create_time = NOW(), content= '${content}' WHERE id = ${setId}`, (err) => {
    if (err) throw err;
    callback();
  });
}

// 메모중에 id 가 일치하는 데이터만 추출 공지를 선택할때 쓰는함수
function getMemoById(id, callback) {
  connection.query(`SELECT * FROM kibuttztable WHERE id = ${id}`, (err, row) => {
    if (err) throw err;
    callback(row);
  });
}

// 공지사항 삭제버튼 누를때 쓰는함수
function deleteById(id, callback) {
  connection.query(`DELETE FROM kibuttztable WHERE id = ${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}

function countNum(id, callback) {
  connection.query(`UPDATE kibuttztable SET num = num+1 WHERE id = ${id}`, (err, row) => {
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

function getMainMemo(callback) {
  connection.query('SELECT * FROM kibuttztable ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
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
  getMainMemo,
};
