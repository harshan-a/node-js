const fs = require("fs");

module.exports.getUsersData = function() {
  const users = fs.readFileSync('../../data/user.json', 'utf8');
  const data = JSON.parse(users);
  return data;
}

module.exports.writeUsersData = function(usersData) {
  fs.writeFileSync('../../data/user.json', JSON.stringify(usersData));
}