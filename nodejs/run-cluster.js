cluster = require('cluster');
log     = require('logule');

if (cluster.isMaster) {
  log.info("Master have just started");
  // i = amount of cores
  for (i = 1; i <= 2; i++) {
    cluster.fork();
  }
  cluster.on('death', function(worker) {
    log.error("Worker " + worker.pid + " died!");
    return cluster.fork();
  });
} else {
  app = require('./test.js');
  app.start()
}
