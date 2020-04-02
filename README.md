# Jon's Candy Shop(beta)!
A node whole sale candy store. 

What we have here is an online wholesale candy store. This web application (for the moment) stores the users favorite candy for future whole sale discounts. Lets talk about how it works.

## How it works
For starters, the user wont be able to see what candy is available until they register with the candy shop as a whole sale buyer. Once confirmed, the user will be able to select from a variation of candy to add to their favorites(list will be updated). From there, users will be able to see the candy that they have added to their favorites. Users will then have an option to add more OR remove select candy from their favorites. When all is settled and satisfied users can process their favorites for future whole sale orders.

## Clone instructions
If you would like to get a copy of this magnificent masterpiece to use as a canvas to color it and make it your own, you'd have to first clone this repo. After that please don't forget to include the following node modules or you'll be forever lost in and endless void.
- npm i express-session
- npm i faker
- npm i passport
- npm i passport-local
- npm i express-validator
- npm i bcryptjs
- npm i dotenv
 * Dont forget your .env file as well as your .gitignore to save you the trouble

## Routes
As of now, the store only contains two working models.
* sweets -> for the candy
* users -> for the users
From there we only have two parent routes.
```
app.use('/users', usersRouter);
app.use('/sweets', sweetRouter);
```