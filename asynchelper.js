import fs from "fs/promises";

export async function readData() {
	try {
		const data = await fs.readFile("./database.json", "utf-8");
		console.log("a", data);
		return JSON.parse(data);
	} catch (err) {
		throw new Error("Error reading database", err.message);
	}
}

export async function writeData(resource) {
	try {
		const data = await readData();

		data.status.capacity += +resource.resources;
		let revenue = +resource.resources * data.status["resource-value"];
		data.status.revenue += revenue;
		data.status["current-harvest"] = [
			...data.status["current-harvest"],
			resource,
		];

		await fs.writeFile("./database.json", JSON.stringify(data, null, 2));
		return data;
	} catch (err) {
		throw new Error("Error writing database", err.message);
	}
}

export async function resetData(sale) {
	try {
		const data = await readData();
		data.status.balance += data.status.revenue;
		let entry = {
			id: sale.id,
			time: sale.time,
			"sold-resources": data.status.capacity,
			"total-revenue": data.status.revenue,
			harvest: data.status["current-harvest"],
		};
		data.sales = [...data.sales, entry];
		data.status.revenue = 0;
		data.status.capacity = 0;
		data.status["current-harvest"] = [];

		await fs.writeFile("./database.json", JSON.stringify(data, null, 2));
		return data;
	} catch (err) {
		throw new Error("Could now reset data");
	}
}
