# **Bamazon App**

This app is an Amazon-like storefront that takes in orders from customers and depletes stock from the store's inventory. All data is stored in MySQL. Inquirer and MySQL npm packages were required to make this app work. The app serves 3 different functions: customer facing for the ability to make a purchase, manager facing to perform admin tasks, and supervisor facing to manage business. 

## * Customer *
1. The customer will be shown a table of products with item details. 
1. The customer will be prompted to enter the item id of the product they wish to buy. 
1. The customer wil be asked how much of the item they wish to buy. 
    1. If they select a quantity that exceeds stock quantity, they will be redirected back to initial prompt to select item id. 
    1. If there is enough stock to satisfy the order, the purchase will be approved and completed. At this time, the stock quantity of that item will be reduced by the amount that was just purchased by the customer. Data will be updated in the products MySQL table. 

Here is a video of how the customer facing portion of the app works: 

## * Manager *

1. The manager will be asked to select an action from a list of options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
1. If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
1. If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
1. If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
1. If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

Here is a video of how the manager facing portion of the app works: