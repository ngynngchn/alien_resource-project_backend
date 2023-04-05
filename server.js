//=============== package import =================
import express from "express";
import morgan from "morgan";
import cors from "cors";
//=============== helper import =================
import { readData } from "./helper.js";

//================================================

const server = express();

const PORT = process.env.PORT || 8889;

// bodyparser
server.use(express.json());
// logger
server.use(morgan("dev"));
// cross origin enabling with http://localhost:5173
server.use(cors({ origin: "http://localhost:5173" }));

// routing

// GET handler : current balance and capacity
server.get("/api/v1/status", (request, response) => {
	readData()
		.then((data) => response.json(data))
		.catch((err) => console.log(err));
});

// GET handler : current balance
server.get("/api/v1/money", (request, response) => {});

// GET handler : current capacity
server.get("/api/v1/capacity", (request, response) => {});

// POST handler : x amount of sold resources
server.post("/api/v1/sell", (request, response) => {});

// POST handler : adding resources
server.post("/api/v1/humans", (request, response) => {});

//================ start server ==================
server.listen(PORT, () => {
	console.log("I am listening to PORT:", PORT);
});
