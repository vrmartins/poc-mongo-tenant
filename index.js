require('dotenv-safe').load()
const app = require('express')()
const mongoose = require('mongoose')
const faker = require('faker')
const BookModel = require('./book-model')
const AuthorModel = require('./author-model')

const start = async () => {

  app.route('/book').get(async (request, response) => {
    const books = await BookModel.byTenant(request.headers['x-tenant-id']).find({})
    response.json({ ...books })

  })

  app.route('/book').post(async (request, response) => {
    try {
      const BoundBookModel = BookModel.byTenant(request.headers['x-tenant-id'])
      const book = await (new BoundBookModel({
        name: faker.name.findName(),
        age: faker.random.number(100),
        tenantId: BoundBookModel.getTenantId()
      }))
        .save()
      response.json(book)
    } catch (error) {
      response.status(400).json({ message: error })
    }
  })

  app.route('/author').get(async (request, response) => {
    const authors = await AuthorModel.byTenant(request.headers['x-tenant-id']).find({})
    response.json({ ...authors })

  })

  app.route('/author').post(async (request, response) => {
    try {
      const BoundAuthorModel = AuthorModel.byTenant(request.headers['x-tenant-id'])
      const author = new BoundAuthorModel({
        name: faker.name.findName(),
        age: faker.random.number(100),
        tenantId: BoundAuthorModel.getTenantId()
      })
      response.json(await author.save())
    } catch (error) {
      response.status(400).json({ message: error })
    }
  })

  const databaseUri = function () {
    if (process.env.NODE_ENV !== 'production') return `mongodb://${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
    return `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  }();

  try {
    await mongoose.connect(databaseUri, { useNewUrlParser: true, useCreateIndex: true })
    app.listen(3000, (error) => {
      if (error) console.error('error', error)
      console.log('working')
    })
  } catch (error) {
    console.error(error)
  }
}

start()
