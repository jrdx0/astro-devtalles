import { db, Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 14, isActive: true },
		{ id: 2, name: "Fernando", age: 31, isActive: true },
		{ id: 3, name: "Jared", age: 24, isActive: true },
		{ id: 4, name: "Julio", age: 26, isActive: true },
		{ id: 5, name: "Martin", age: 32, isActive: true },
	])
}
