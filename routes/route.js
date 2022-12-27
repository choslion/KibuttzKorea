// 실행할거 경로설정하는 routes 폴더

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'public/uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 },
});

router.get('/', (req, res) => {
  db.getMainMemo((rows) => {
    res.render('index', { rows: rows, darkMode: false });
  });
});

router.get('/join', (req, res) => {
  res.render('join', { darkMode: true });
});

router.get('/past', (req, res) => {
  res.render('pastFuture', { darkMode: true });
});

router.get('/inform', (req, res) => {
  db.getMemo((rows) => {
    res.render('inform-list', { rows: rows, darkMode: true });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { darkMode: true });
});

router.get('/write', (req, res) => {
  res.render('inform-write', { darkMode: true });
});

router.post('/write', (req, res, next) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let title = param['title'];
  let author = param['author'];
  let content = param['content'];
  db.insertMemo(title, author, content, () => {
    res.redirect('inform');
  });
});

router.get('/content', (req, res) => {
  let id = req.query.id;
  db.countNum(id, () => {
    db.getMemoById(id, (row) => {
      res.render('inform-content', { row: row[0], darkMode: true });
    });
  });
});

router.get('/fix', (req, res) => {
  let id = req.query.id;
  db.getMemoById(id, (row) => {
    res.render('inform-fix', { row: row[0], darkMode: true });
  });
});

router.post('/fix', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let setId = param['setId'];
  let title = param['title'];
  let author = param['author'];
  let content = param['content'];
  db.updateMemos(setId, title, author, content, () => {
    res.redirect('inform');
  });
});

router.get('/deleteMemo', (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.deleteById(id, () => {
    res.redirect('inform');
  });
});

router.get('/new', (req, res) => {
  res.render('inform-new', { darkMode: true });
});

router.post('/loginS', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let userId = param['userId'];
  let userPw = param['userPw'];
  db.checkLogin(userId, userPw, (results) => {
    if (results.length > 0) {
      res.redirect('/');
    } else {
      res.send(`<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>`);
    }
  });
});

router.post('/joinUs', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let userName = param['userName'];
  let userId = param['userId'];
  let userPw = param['userPw'];
  let userPwC = param['userPwC'];
  let userMail = param['userMail'];
  let userNumber = param['userNumber'];
  db.insertJoin(userName, userId, userPw, userPwC, userMail, userNumber, () => {
    res.redirect('/login');
  });
});

router.get('/tourWrite', (req, res) => {
  res.render('tourWrite', { darkMode: true });
});

router.get('/tourThumnail', (req, res) => {
  let img = req.query.img;
  db.getProduct((rows) => {
    res.render('tourThumnail', { darkMode: true, rows: rows });
  });
});

router.get('/updateTour', (req, res) => {
  let id = req.query.id;
  db.getProductById(id, (row) => {
    res.render('updateTour', { row: row[0], darkMode: true });
  });
});

router.get('/deleteProduct', (req, res) => {
  let id = req.query.id;
  db.deleteProductById(id, () => {
    res.redirect('/tourThumnail');
  });
});

router.post('/tourWrite', upload.single('productImg'), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let img = 'uploads/' + req.file.filename;
  let productName = param['productName'];
  let productPrice = param['productPrice'];
  let productDetail = param['productDetail'];
  db.insertProduct(img, productName, productPrice, productDetail, () => {
    res.redirect('/tourThumnail');
  });
});

router.post('/updateTour', upload.single('productImg'), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let setId = param['setId'];
  let img = 'uploads/' + req.file.filename;
  let productName = param['productName'];
  let productPrice = param['productPrice'];
  let productDetail = param['productDetail'];
  db.updateProduct(setId, img, productName, productPrice, productDetail, () => {
    res.redirect('/tourThumnail');
  });
});

router.get('/deleteProduct', (req, res) => {
  let id = req.query.id;
  db.deleteProductById(id, () => {
    res.redirect('/tourThumnail', { darkMode: true });
  });
});

try {
  fs.readFileSync('public/uploads/', { encoding: 'utf8', flag: 'r' });
} catch (err) {
  // console.log('폴더가 존재하지 않습니다.');
  if (!fs.existsSync('public/uploads')) fs.mkdirSync('public/uploads');
}

module.exports = router;
