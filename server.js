//=============== package import =================
import express from "express";
import morgan from "morgan";
import cors from "cors";
//=============== helper import =================
import { readData, writeData, resetData } from "./helper.js";

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

// POST handler :
server.post("/api/v1/sell", (request, response) => {
	const data = request.body;
	console.log("sell", data);
	resetData(data)
		.then((info) => response.json(info))
		.catch((err) => console.log(err, "Could not sell"));
});

// POST handler : adding resources
server.post("/api/v1/resources", (request, response) => {
	const data = request.body;
	console.log("resources", data);
	writeData(data)
		.then((status) => response.json(status))
		.catch((err) => console.log(err, "Could not update data"));
});

//================ start server ==================
server.listen(PORT, () => {
	console.log("I am listening to PORT:", PORT);
});
