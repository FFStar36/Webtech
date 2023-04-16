const http = require('http');
const fs = require('fs');
const port = 8000;

const root = __dirname + '/files'

let dirRequested = (req) => req.url.endsWith('/');
let pathExists = (path, success, error) => {
  if (fs.existsSync(path)) {
    success();
  } else {
    error();
  }
};
let parseBody = (req, callback) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    callback(data);
  });
};

let router = {
  get: (req, res) => {
    pathExists(root + req.url,
      () => {
        res.writeHead(200);
        let result;
        if (dirRequested(req)) {
          result = fs
            .readdirSync(root + req.url)
            .map((e) => {
              let stats = fs.lstatSync(root + req.url + e);
              return {
                path: e,
                type: (stats.isDirectory()) ? 
                  'directory'
                  : (stats.isFile()) ?
                    'file'
                    : 'unknown'
              }
            });
            res.write(JSON.stringify(result));
            res.end();
        } else {
          result = fs.readFileSync(root + req.url);
          res.write(result);
          res.end();
        }        
      },
      () => {
        res.writeHead(404);
        res.end('File or directory does not exist!');
      }      
    );
  },
  post: (req, res) => {
    pathExists(root + req.url,
      () => {
        res.writeHead(400);
        res.end('File already exists!');
      },
      () => {
        parseBody(req, (body) => {
          if (dirRequested(req)) {
            fs.mkdirSync(root + req.url, { recursive: true });
          } else {
            let path = req.url.split('/');
            let file = path.pop();
            path = path.join('/');
            fs.mkdirSync(root + '/' + path, { recursive: true });
            fs.writeFileSync(root + '/' + path + '/' + file, body);
          }
          res.writeHead(200);
          res.end();
        });
      }
    );
  },
  put: (req, res) => {
    pathExists(root + req.url,
      () => {
        parseBody(req, (body) => {
          fs.writeFileSync(root + req.url, body);
          res.writeHead(200);
          res.end();
        });
      },
      () => {
        res.writeHead(404);
        res.end('File does not exists!');
      }
    );
  },
  delete: (req, res) => {
    pathExists(root + req.url,
      () => {
        fs.rmSync(root + req.url, { recursive: true });
        res.writeHead(200);
        res.end();        
      },
      () => {
        res.writeHead(404);
        res.end('File does not exists!');
      }
    );
  }
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  try {
    if (router[req.method.toLowerCase()]) {
      router[req.method.toLowerCase()](req, res);
    } else {
      res.writeHead(200);
      res.end('Method not supported')
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Internal Server Error!')
  }
}).listen(port);