var request = function(app) {

  const buildOptions = function(verb, port, path) {
    const options = {
      port: port,
      path: path,
      method: verb
    };
    return options;
  }
  var port = ~~(Math.random() * 10000) + 2000;
  var server = http.createServer(app);
  server.listen(port);
  return {
    get: function(path) {
      return new Promise((resolve, reject) => {
        var req = http.request(buildOptions("GET", port, path), (res) => {
          res.pipe(concat((body) => {
            res.text = body.toString();
            resolve(res)
          }))
        })

        req.on('error', reject)
        req.end();
      })
    },
    post: function(path) {
      return new Promise((resolve, reject) => {
        var req = http.request(buildOptions("GET", port, path), (res) => {
          res.pipe(concat((body) => {
            res.text = body.toString();
            resolve(res)
          }))
        })

        req.on('error', reject)
        // write data to request body
        req.write(postData);
        req.end();
      })
    },
    end : function() {
      server.close();
    },
    close : function() {
      server.close();
    }
  }
}

