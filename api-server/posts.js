const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare tincidunt arcu vel sagittis. Cras volutpat dapibus leo et ornare. Nullam semper lectus sem. Nullam condimentum egestas euismod. Etiam ullamcorper felis id dui pretium, nec convallis tellus condimentum. Praesent eu auctor orci, sed elementum metus.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare tincidunt arcu vel sagittis. Cras volutpat dapibus leo et ornare. Nullam semper lectus sem. Nullam condimentum egestas euismod. Etiam ullamcorper felis id dui pretium, nec convallis tellus condimentum. Praesent eu auctor orci, sed elementum metus.',
    author: 'thingone',
    category: 'redux',
    voteScore: 15,
    deleted: false,
    commentCount: 0
  },
  "600003ym7mf1p33lnez": {
    id: '600003ym7mf1p33lnez',
    timestamp: 1468479787190,
    title: 'Redux redux redux!',
    body: 'Another GREAT post about redux.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare tincidunt arcu vel sagittis. Cras volutpat dapibus leo et ornare. Nullam semper lectus sem. Nullam condimentum egestas euismod. Etiam ullamcorper felis id dui pretium, nec convallis tellus condimentum. Praesent eu auctor orci, sed elementum metus.',
    author: 'thingone',
    category: 'redux',
    voteScore: 100,
    deleted: false,
    commentCount: 0
  },
   "14n20ok3ym7mf1p33lnix": {
    id: '14n20ok3ym7mf1p33lnix',
    timestamp: 1468479767195,
    title: 'Can the real slim shady please stand up!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare tincidunt arcu vel sagittis. Cras volutpat dapibus leo et ornare. Nullam semper lectus sem. Nullam condimentum egestas euismod. Etiam ullamcorper felis id dui pretium, nec convallis tellus condimentum. Praesent eu auctor orci, sed elementum metus. Phasellus molestie mauris id fermentum hendrerit. Donec vehicula turpis id magna pretium pharetra. Phasellus congue magna est, quis semper ex rhoncus vitae. Mauris tincidunt, odio ac interdum dictum, felis urna euismod leo, vitae tempus ligula lacus ac lectus. Praesent placerat nisi a pulvinar gravida. Quisque posuere, quam ut tristique dictum, urna ligula malesuada sem, ut malesuada nibh sem quis purus. Integer iaculis arcu at tellus pellentesque tempus. Etiam convallis vitae nisl nec blandit. Nulla nec tortor sagittis ex volutpat cursus eu a felis.',
    author: 'thingthree',
    category: 'node',
    voteScore: 25,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
      // console.log('post edit function', post)
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
