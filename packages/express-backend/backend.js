// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;


const users = {
  users_list: [
    /*{
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
    }*/
  ]
};

app.use(cors());
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


const randomId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";

  const letters = [...Array(3)].map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  const digits = [...Array(3)].map(() => nums[Math.floor(Math.random() * nums.length)]).join('');

  return letters + digits
  }
  


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};



app.get("/", (req, res) => {
  res.send("Hello World!");
});

//IA4
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices.getUsers(name,job)
    .then((result) => {
        if (result) res.send(result);
        else res.status(404).send(`Not Found: ${name,job}`);
      })
    .catch((error) => {
      res.status(500).send(error.name);
    });

  });
  
  /*  if (job!= undefined && name != undefined){
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
});*/

//IA4
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  
  userServices.findUserById(id)
    .then((result) => {
      if (result) res.send(result);
      else res.status(404).send(`Not Found: ${id}`);
      })
    .catch((error) => {
      res.status(500).send(error.name);
  });
});

  /*
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
*/

//IA4
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.deleteUser(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });



  /*
  const prevlength = users["users_list"].length;
  users["users_list"] = users["users_list"].filter(user => user.id !== id);
  if (users["users_list"].length === prevlength) {
    res.status(404).send("User not found.");
  } else {
    res.status(204).send(); 
  }*/
});

//IA4
app.post("/users", async (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
    .then((result) => res.status(201).send(result));
});

  /*
  userToAdd["id"] = randomId();
  //console.log(userToAdd);
  addUser(userToAdd);
  res.status(201).send(userToAdd); //Use 201 Content Created
});*/

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});