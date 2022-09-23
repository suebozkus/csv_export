const https = require("https");
const fs = require("fs");

https
  .get("https://jsonplaceholder.typicode.com/users", (res) => {
    let data = [];
    const headerDate =
      res.headers && res.headers.date ? res.headers.date : "no response date";
    console.log("Status Code:", res.statusCode);
    console.log("Date in Response header:", headerDate);

    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      console.log("Response ended: ");
      const users = JSON.parse(Buffer.concat(data).toString());
      const headerColumn = Object.keys(users[0]).toString();
      let dataString = "";
      dataString += headerColumn + "\n";
      users.map((user) => {
        dataString +=
          Object.keys(user)
            .map((key) => {
              if (typeof user[key] === "object") {
                return JSON.stringify(user[key]);
              }
              return user[key];
            })
            .toString() + "\n";
      });

      fs.writeFileSync("result.csv", dataString);

      console.log(users);
    });
  })
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
