// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);


const findUserByName = (name) => {
      return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job );
};

const findUserByNameAndJob = (name,job) => {
  return users["users_list"].filter((user) => user["job"] === job && user["name"] === name);
};


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (user) => {
  users["users_list"].pop(user);
  return user;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (job!= undefined && name != undefined){
    const result = findUserByNameAndJob(name, job);
    res.send({ users_list: result });
  }
  else if (job!= undefined){
    const result = findUserByJob(job)
    res.send({ users_list: result });
  }
  else if (name != undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userToDelete = findUserById(id);
  deleteUser(userToDelete);
  res.send();
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});