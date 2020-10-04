module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob("src/content/posts/*.md")];
  posts.reverse();
  return posts;
};
