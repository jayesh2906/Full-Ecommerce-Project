# Full-Ecommerce-Project(MERN Stack)
![image](https://user-images.githubusercontent.com/93786534/180216947-b0945639-c588-440e-a67a-f1c70d852e09.png)

## Overview
The ‘Online E-commerce Web application’ Services department strives to provide solutions to develop
and transfer easy and efficient way in the digital age and to help reduces the human pressure and time. “ICON Store Management System” is a web
application written for all operating systems, designed to help users maintain and organize shop virtually.
This software is easy to use for both beginners and advanced users. It features a familiar and well thoughtout, an attractive user interface, combined with strong searching Insertion.

## User Characteristics
### Admin 
The administrator has all the rights to access the system. He is the one who has all rights to
view the members, sellers and product details, modify those details. He can accept or reject the request of seller for adding the product.
### Seller
The seller is the one who can request admin to add his product to Icon store and Admin can accept or reject the request of seller.
The seller can log in to the system as seller by using his specific email and password, He can view his profile and update his details.
### User
The user can log in to the system by using his specific email and password. User can view the
products and order the products according to their own needs. He can view his profile and update his details. He can update his personal information by logging into the system. User can find various product by using search option easily, User can also filter and Sort various products. 

## Technologies used
* Javascript
* React Js
* Node Js
* Expess Js
* Html
* CSS
* Bootstrap
* Material Ui

## Database used
* MongoDb

## Project Description and Functionality
### User view 
* User can register or login to the system as user(encryption and decryption of password with the help of bcrypt.js module).
* User can search, sort, filter various products by category.
* User can wishlist his/her favourite products and also add it to the cart.
* Used Geo-location for auto filling shipping address of user.
* Used Paypal SDK javascript script for demo virtual payment of orders(payment gateway).
* Used Twilio message sender, Message will popup to user registered mobile no. after successfully placing an order.
* User can also generate the bill pdf of order.
* Only logged-in(authorized) user can update profile or can see his/her orders used jsonwebtoken for authentication.(middleWare for jwt token verification)

### Seller view
* Seller can register or login to the system as seller.
* Seller can request admin to add products.
* Seller can search, Sort his/her products by category(loggedin authorized seller).
* Seller can update his/her profile(loggedin authorized seller).
* Seller can Edit, Delete his/her product(loggedin authorized seller).

### Admin view
* Admin can add the products and can accept or delete the request of seller
* Admin dashboard has track of all seller requests, Seller details and count, User details and count, Orders details and count.
* Admin can search, sort, filter, Edit and Delete various products of "ICON STORE".

## Conclusion
This web application provides a computerized version of shop manipulate system which will benefit the
users as well as the visitor of the shop. It makes entire process online where users can search
product, and buy various product. It also has a facility for common user by login into the system
where user can login and can see status of ordered, Seller can also login into the system and request admin to add various products into the system to sell. It provide the facility of admin’s login where admins can add various item, Accept or reject seller request, Review
users and seller activity.



