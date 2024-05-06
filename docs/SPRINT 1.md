# high level design, 1.0

# SPRINT 1:-

- **Product vision**

  - this products aim to be featured e-store that is reliable and extendable, built to show my abilities in coding and designing and dealing with problems

- **functional requirements**

  - Streamlined account creation for purchasing with various tiers and prices, automatically adjusted for different customers.

  - Each product includes a short description, picture, customer price, your cost, shipping cost, stock quantity, SKU, and model number.

  - Inventory tracking across locations with warehouse.

  - Sections for warranty requests and damaged products.

  - Pop-up sales on the front page, set by you, with different products on sale.

  - Promotions for bulk buyers and pop-up and logged-in page advertising.

  - Communication between employees and with customers via the platform and email.

  - Supplier info stored, with orders sent from the platform.

  - Customers can have multiple locations, with orders split accordingly.

  - Monitoring of risky, inactive, and active customers, with marketing abilities and profit/loss reports.

  - Tax reports categorize sales tax by state.

  - Payment gateways include credit cards, debit cards, wire transfers, and Open API Key.

  - Online store handles orders and preorders.

  - Fields provided for tax exemption and certificates, including MC certificates, resale certificate license numbers, MC numbers, activation, and expiration dates.

  - Alerts notify when expiration dates are nearing, prompting customers to submit new certificates.

- **technical requirements**

  - cloud hosting (AWS)
  - database (mongoDB)
  - media storage (S3)
  - front end with SSR router (next.js/sveltekit)
  - APIs (Nest.js)
  - router (Nginx)
  - backend system (Node.js)

- **architecture**

  - architecture will be modular monolithic

  - each section will be handled by a process called: manager. (e.g inventory manager)

  - each IO operation has a service to call it (so that we can abstract services from implementation)

  - because hardware is not affordable for using MQs on containers, the communication styles will be synchronous but there will be jobs queue model inside each module to handle transactions in asynchronous manner

  - **components**

    - MongoDB for static data storage
    - memcacheD for fast loading data storage
    - elasticSearch for text search

  - **macro services**
    - mongodb-controller
    - memcached-controller
    - elastic-search
    - inventory-manager
    - users-manager
    - search-manager
    - products-API
    - boot-loader
    - carts-manager
    - logger

## DB design

- **data stores**

  - MongoDB for static storage
  - Memcached for in-memory storage
  - elasticSearch for text searching

- **schemas**

  - products
    ```typescript
    interface Product {
      id: number;
      title: string;
      description: string;
      category: string;
      imageLink: string;
      oldPrice: number;
      newPrice: number;
      galleryLinks: string[];
    }
    ```
  - users

    ```typescript
    interface User {
      id: number;
      username: string;
      email: string;
      password: string;
      cart: CartItem[];
    }

    interface CartItem {
      productId: number;
      quantity: number;
    }
    ```

  - categories
    ```typescript
    interface Category {
      id: number;
      name: string;
    }
    ```
