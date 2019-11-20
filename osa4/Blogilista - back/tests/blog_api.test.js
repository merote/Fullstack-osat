const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/blog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogs)
})

test('blogs are returned and there should be 5 blogs ', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body.length)
  expect(response.body.length).toBe(helper.initBlogs.length)
})

test('blogs return the field id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()  
})

test('POST method succeeds to /api/blogs', async () => {
  const newBlog = {
      title: "Chaos theory",
      author: "Lucifer",
      url:  "http:\\www.hell.com",
      likes: 666
    }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)  

  const blogs = await Blog.find({})
  expect(blogs.length).toBe(helper.initBlogs.length + 1)  
})

test('Likes field is set to 0, when posted as empty', async () => {
  const newBlog = {
    title: "How to destroy universe",
    author: "Thanos",
    url:  "http:\\www.thanosrules.com",
    likes: '' 
  }
  await api
  .post('/api/blogs')
  .send(newBlog)

  const response = await api.get('/api/blogs') 
  const content = response.body.filter(b => b.title === "How to destroy universe")
  expect(content[0].likes).toBe(0)  
})

test('400 Bad request given, if title and url fields missing with POST', async () => {
  const newBlog = {
    author: "Thanos",
    likes: 22 
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)  
})
  

afterAll(async () => {
  await mongoose.connection.close()
})