require('dotenv').config();
const http = require("http");
const url = require('url');
const fs = require("fs");
const mime = require('mime-types');
const {getIndex} = require('./getFile');
const PORT = process.env.PORT || 3000;

const sever = http.createServer((req, res) => {
  const path = url.parse(req.url, true);
  let pathName = path.pathname;

  if (pathName === "/") {
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write(getIndex());
  } else {
    res.writeHead(200, getMime(pathName));
    res.write(getData(`./${pathName}`));
  }
  res.end();
});

const getMime = path => {
  let mimeType = {};
  let type = mime.lookup(path);
  mimeType['Content-type'] = type;
  return mimeType;
}

const getData = fileName => {
  let data = '';
  try {
    data = fs.readFileSync(fileName);
  } catch (error) {
    console.log(error);
  }
  return data;
};

sever.listen(PORT, () => {
  console.log("sever ready");
});
