require('dotenv-safe').load()
const app = require('express')()
const mongoose = require('mongoose')

const start = async () => {
  app.route('/').get((request, response) => {
    response.json({ message: 'ok' })
  })
  
  const databaseUri = function() {
    if (process.env.NODE_ENV !== 'production') return `mongodb://${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
    return `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  }();
  
  try {
    await mongoose.connect(databaseUri, {useNewUrlParser: true, useCreateIndex: true})
    app.listen(3000, (error) => {
      if (error) console.error('error', error)
      console.log('working')
    })
  } catch (error) {
    console.error(error)
  }
}

start()
