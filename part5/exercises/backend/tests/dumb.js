const dumb = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, likes) => likes + acc, 0);
};

const favoriteBlog = (blogs) => {
  let max = 0;
  let fav = {};
  for (blog of blogs) {
    if (blog.likes > max) {
      fav = blog;
      max = blog.likes;
    }
  }
  return { title: fav.title, author: fav.author, likes: fav.likes };
};

const countBy = (arr, prop) => {
  const group = {};
  arr
    .map((elem) => elem[prop])
    .forEach((elem) =>
      group[elem] ? (group[elem] = group[elem] + 1) : (group[elem] = 1)
    );
  return group;
};

const maxOfBy = (obj, func) => {
  return Object.values(obj).reduce((elem, currMax) => func(elem, currMax));
};

const select = (obj, max) => {
  return Object.keys(obj)[Object.values(obj).findIndex((val) => val === max)];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    throw "List can't be empty";
  }
  const countPerAuthor = countBy(blogs, "author");
  const max = maxOfBy(countPerAuthor, Math.max);
  const author = select(countPerAuthor, max);
  return { author: author, blogs: max };
};

const totalOfBy = (arr, groupProp, countProp) => {
  const group = {};
  arr.forEach((elem) =>
    group[elem[groupProp]]
      ? (group[elem[groupProp]] = group[elem[groupProp]] + elem[countProp])
      : (group[elem[groupProp]] = elem[countProp])
  );
  return group;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    throw "List can't be empty";
  }
  const totalOfLikesPerAuthor = totalOfBy(blogs, "author", "likes");
  const max = maxOfBy(totalOfLikesPerAuthor, Math.max);
  const author = select(totalOfLikesPerAuthor, max);
  return { author: author, likes: max };
};

module.exports = {
  dumb,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
