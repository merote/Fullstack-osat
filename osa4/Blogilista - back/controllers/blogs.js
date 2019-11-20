const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})     
    if (blogs) {
      response.json(blogs)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
      next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined && body.url === undefined) {
    //console.log("TÄÄLLÄ")
    return response.status(400).end()
  } else {

  const blog = new Blog({
    title: body.title,
    author: body.number,
    url: body.url,
    likes: body.likes === '' ? 0 : body.likes
  })
    try {
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter