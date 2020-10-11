module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob("src/content/posts/*.md")];
  posts.reverse();

  // inject newer and older post information into the collection
  for (let i = 0; i < posts.length; i++) {
    const olderPost = posts[i + 1];
    const newerPost = posts[i - 1];

    posts[i].data["olderPost"] = olderPost;
    posts[i].data["newerPost"] = newerPost;
  }
  return posts;
};
