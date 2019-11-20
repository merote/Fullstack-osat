const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.map(b => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const max_index = likes.indexOf(Math.max(...likes))
  return {title: blogs[max_index].title,
          author: blogs[max_index].author,
          likes: blogs[max_index].likes}
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(b => b.author)
  const authors_and_blogs = _.entries(_.countBy(authors))
  const only_blogs = _.map(authors_and_blogs, _.last)
  const index = _.indexOf(only_blogs, _.max(only_blogs)) 
  return {author: authors_and_blogs[index][0],
          blogs: authors_and_blogs[index][1]}
}

const mostLikes = (blogs) => {
  const authors = _.map(_.uniqBy(blogs, 'author'),'author')
  const likes_of_authors = authors.map(a => 
                                _.sumBy(_.filter(blogs, {'author' : a}), 'likes' ))  
  const index = _.indexOf(likes_of_authors, _.max(likes_of_authors))
  return {author: authors[index],
          likes: likes_of_authors[index]}
}

  module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

