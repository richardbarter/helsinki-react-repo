const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    :blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

}

// const mostBlogs = (blogs) => {
//   //receives list of blogs. 
//   //Function returns the author who has the largest amount of blogs.
//   //return value also contians the number of blogs the top author has.
//   //ex { author: 'Camina Drummer', blogs: 3 }
//   console.log('in most blogs');
//   //console.log('initial blogs is', blogs);
//   //console.log('blogs pluck ', _.pluck(blogs, 'author'))
  
//   // console.log('group by author', _.groupBy(blogs, 'author'))
//   //console.log('countby  by author', _.countBy(blogs, 'author'))
//   // may have to be count by then somehow mak eit
//   const countByAuthors = _.countBy(blogs, 'author')
//   console.log('count by ', countByAuthors);
 
//   //console.log('try chain', _.chain(blogs).countBy('author').values());
//   //console.log('countby  by author', _.chain(blogs).countBy(blogs, 'author').value())
//   const groupByAuthors = _.groupBy(blogs, 'author')
//   console.log('groupByAuthorss', groupByAuthors);
//   // const author = groupByAuthors.reduce((found, author) => {
//   //   console.log('found is', found);
//   //   console.log('author is', author);
//   //   return author
//   // })


//   return author

//   // console.log('to pair', _.forEach(countByAuthors, function(value, key){
//   //   console.log('value is', value)
//   //   console.log('key is', key);
//   // }))
//   // const blogCount = _.reduce(countByAuthors, function(result, value, key) {
   
//   //   return result.push(value)
    
    
//   // }, [])
//   //const maxAuthor = _.maxBy(countByAuthors, )
//   //const filteredAuthors = 

  
  
  
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs
}