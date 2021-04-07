const fs = require("fs");

exports.logEntry = async (req, res) => {
  fs.readFile("./logEntries.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const count = ++data.split(":")[1];
    fs.writeFile("./logEntries.txt", `number-of-entries:${count}`, (err) => {
      console.log(err);
    });
  });
};
