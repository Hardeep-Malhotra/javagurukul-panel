const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.javagurukulcluster.fllyfs5.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);