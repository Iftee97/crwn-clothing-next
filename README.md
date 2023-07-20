# Crwn Clothing

### products fetched from:
mongodb

### admin auth crendentials:
- phone: `+8801834814276`
- password: `iftee27`

user signs up & in with a (valid bangladeshi) phone number and password. gets back an json web token, which is stored in browser's cookie which determines logged in state. on logout, the jwt is cleared from the browser's cookie. 

every signed up user is stored in mongo db, and then used to associate orders they create. those orders and the users which those belong to can be viewed by the admin user. 

the admin can view every signed up user and every orders created separately.

### techs used:
- next js (api routes to make calls to db for users and orders)
- tailwind css
- mongodb with mongoose
- jwt for auth
