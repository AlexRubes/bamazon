let mysql = require('mysql');
require('console.table');
let inquirer = require('inquirer');

//initialize conneciton
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// test connection
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
    }
    start();
});

// function which prompts the manager for what action they want to take
function start() {
    inquirer
        .prompt({
            name: "options",
            type: "rawlist",
            message: "Welcome Bamazon Manager, what action would you like to perform?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.options === "View Products for Sale") {
                viewProdForSale();
            }
            if (answer.options === "View Low Inventory") {
                viewLowInventory();
            }
            if (answer.options === "Add to Inventory") {
                addToInventory();
            }
            if (answer.options === "Add New Product") {
                addNewProduct();
            }
        });
}

function viewProdForSale() {
    let query = 'SELECT * FROM products';
    connection.query(query, function (err, res) {
        // show the products
        console.table(res);
        start();
    });
}

function viewLowInventory() {
    let query = 'SELECT * FROM products WHERE stock_quantity < 5';
    connection.query(query, function (err, res) {
        // show the low inventory lines
        console.table(res);
        start();
    });
}

function addToInventory() {
    console.log("Adding inventory...\n");

    inquirer
        .prompt([
            {
                name: "item_id",
                type: "input",
                message: "Enter the item id of the product you want to add inventory for?"
            },
            {
                name: "quantity",
                type: "input",
                message: "What is the new stock quantity of the selected item_id?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: answer.quantity
                    },
                    {
                        item_id: answer.item_id
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product stock quantity updated!\n");
                    start();
                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            
        });

}

function addNewProduct() {
    console.log("Adding a new product...\n");

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to add to your inventory?"
            },
            {
                name: "department",
                type: "input",
                message: "What department is this item in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the item?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How much stock quantity do you want to add of this item?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " new product was added to your inventory!\n");
                    start();

                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            
        });

}



