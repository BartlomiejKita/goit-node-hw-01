const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		console.log(error.message);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		const filteredContact = contacts.filter(({ id }) => id === contactId);
		return filteredContact;
	} catch (error) {
		console.log(error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		const newContact = { id: v4(), name: name, email: email, phone: phone };
		const newContacts = [...contacts, newContact];
		fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
		return newContact;
	} catch (error) {
		console.log(error.message);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		const newContacts = contacts.filter(({ id }) => id !== contactId);
		fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

		return contacts.filter(({ id }) => id === contactId);
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
