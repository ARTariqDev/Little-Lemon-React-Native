import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

// Function to initialize the database
const initDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, category TEXT, image TEXT)',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to fetch menu items based on selected categories
const fetchMenuItemsByCategories = (selectedCategories: number[]) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      const categoriesCondition = selectedCategories.length > 0 ? `category IN (${selectedCategories.join(',')})` : '1=1';
      tx.executeSql(
        `SELECT * FROM menu_items WHERE ${categoriesCondition}`,
        [],
        (_, { rows }) => {
          const menuItems = rows['_array'];
          resolve(menuItems);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { initDatabase, fetchMenuItemsByCategories };
