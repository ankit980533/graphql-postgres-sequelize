const express=require('express');

const {graphqlHTTP} =require('express-graphql');
const sequelize=require('./database');
const app=express();

const schema=require('./schema');

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');

    // Automatic table creation
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('Database tables created successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
      schema,
      graphiql: true,
      context: { user: req.user },
    }))
  );
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on 3000`);
  });
  
