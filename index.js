require('dotenv').config();
const http = require("http");
const url = require('url');
const {readFile} = require("fs/promises");
const mime = require('mime-types');
const {getIndex} = require('./getFile');
const PORT = process.env.PORT || 3000;

const sever = http.createServer(async (req, res) => {
  const path = url.parse(req.url, true);
  let pathName = path.pathname;
  if (pathName === "/") {
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write(await getIndex());
  } else {
    res.writeHead(200, getMime(pathName));
    res.write(await getData(`./${pathName}`));
  }
  res.end();
});

const getMime = path => {
  let mimeType = {};
  let type = mime.lookup(path);
  mimeType['Content-type'] = type;
  return mimeType;
}

const getData = async fileName => {
  try {
    return readFile(fileName);
  } catch (error) {
    console.log(error);
  }
};

sever.listen(PORT, () => {
  console.log("sever ready");
});
