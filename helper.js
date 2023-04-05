import fs from "fs";

export function readData() {
	return new Promise((resolve, reject) => {
		fs.readFile("./database.json", (err, data) => {
			if (err) reject(err);
			else resolve(JSON.parse(data));
		});
	});
}
