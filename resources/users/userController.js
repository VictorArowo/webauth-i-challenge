const { getUser, postUser, getAllUsers } = require('./userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  let { username, password } = req.body;

  try {
    let exists = await getUser(username);
    console.log(exists);
    if (exists && exists.length)
      return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser = {
      username,
      password: hashedPassword
    };

    let user = await postUser(newUser);

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await getUser(username);
    console.log(user);
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      return res.status(200).json({ message: 'Success' });
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.logout = async (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'An error occured' });
      } else {
        return res.status(200).json({ message: 'Successfully logged out' });
      }
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
