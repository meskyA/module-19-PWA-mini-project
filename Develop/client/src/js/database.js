// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () => {
  // creating a new database named "contact" which will be using version 1 of the database.
  openDB("contact", 1, {
    // add database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreeNames.contains("contact")) {
        console.log("contact database already exists");
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which needs to increment automatically.
      db.createObjectStore("contact", { keyPath: "id", autoIncrement: true });
      console.log("contact database created");
    },
  });
};

// TODO: Complete the postDb() function below:
// export a function we will use to POST to the database.
export const postDb = async (name, home, cell, email) => {
    console.log('Post to the database');

    // create a connection to the database and version we want to use.
    const contactDb = await openDB('contact', 1);

    // create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('contact', 'readwrite');

    // open up the desired object store.
    const store =tx.objectStore('contact');
    // use the .add() method onthe store and pass in the content.
    const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email});
    // get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
    
};

// TODO: Complete the getDb() function below:
// export a function we will use to get tothe database
export const getDb = async () => {
    console.log('GET from the database');

    // create a connection to the database and version we want to use.
    const contactDb = await openDB('contact', 1);

    // create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('contact', 'readonly');

    // open up the desired object store.
    const store = tx.objectStore('contact');
    // use the .getAll() method to get all the data in the database.
    const request = store.getAll();

    // get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);

    // create a connection to the database and version we want to use.
    const contactDb = await openDB('contact', 1);

    // create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('contact', 'readwrite');

    // open up the desired object store.
    const store = tx.objectStore('contact');

    // use the .delete() method to get all data in the database.
    const request = store.delete(id);

    // get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
};

// Start the database.
initdb();
