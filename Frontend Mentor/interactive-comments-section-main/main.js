let comments = []

const loadInitialCommentData = () => {
     fetch('./data.json')
         .then(data => data.json())
         .then(json => comments = json)
}

loadInitialCommentData()
console.log(comments)
