import fs from "fs";

export function readData() {
	return new Promise((resolve, reject) => {
		fs.readFile("./database.json", "utf-8", (err, data) => {
			if (err) reject(err);
			else resolve(JSON.parse(data));
		});
	});
}

export function writeData(resource) {
	// resources = { resources: 100, id: 0, time: "2023-04-05T11:30:06.101Z"}
	return new Promise((resolve, reject) => {
		readData()
			.then((data) => {
				// status = {balance: XXX, capacity: XXX, max-capacity: 400}
				data.status.capacity += +resource.resources;
				let revenue = +resource.resources * data.status["resource-value"];
				data.status.revenue += revenue;
				data.status["current-harvest"] = [
					...data.status["current-harvest"],
					resource,
				];
				fs.writeFile(
					"./database.json",
					JSON.stringify(data, null, 2),
					(err) => {
						if (err) reject(new Error("Error writing to database."));
						else resolve(data);
					}
				);
			})
			.catch((err) => reject(new Error("Error reading database.")));
	});
}

export function resetData(sale) {
	// sale= {time:"2023-04-05T11:30:06.101Z",id: 2}
	return new Promise((resolve, reject) => {
		readData()
			.then((data) => {
				// console.log(data);
				data.status.balance += data.status.revenue;
				let entry = {
					id: sale.id,
					time: sale.time,
					"sold-resources": data.status.capacity,
					"total-revenue": data.status.revenue,
					harvest: data.status["current-harvest"],
				};
				// console.log(entry);
				data.sales = [...data.sales, entry];
				data.status.revenue = 0;
				data.status.capacity = 0;
				data.status["current-harvest"] = [];

				fs.writeFile(
					"./database.json",
					JSON.stringify(data, null, 2),
					(err) => {
						if (err) reject(new Error("Error writing to database"));
						else resolve(data);
					}
				);
			})
			.catch((err) => reject(new Error("Error reading database.")));
	});
}
