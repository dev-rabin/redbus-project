const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
const secretKey2 = crypto.randomBytes(32).toString("hex");

console.table({secretKey,secretKey2});