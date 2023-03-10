// Function to slugify a string
export function slugify(text) {
  return text
    .toString() // Convert to string
    .toLowerCase() // Convert the string to lowercase letters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// Function to format blog posts
export function formatBlogPost(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    if (filterOutDrafts && draft) {
      // If the draft is not null, and the filterOutDrafts flag is set to true, return the accumulator
      return acc;
    }

    if (filterOutFuturePosts && new Date(date) > new Date()) {
      // If the filterOutFuturePosts flag is set to true and the current post date is greater than the current date, then skip this post and move on to the next one
      return acc;
    }

    acc.push(post);

    return acc;
  }, []);

  // Sort the posts by date if sortByDate is true
  if (sortByDate) {
    // Sort the posts by date in descending order
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    // Shuffle the posts if sortByDate is false
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // Slice the filteredPosts array to contain only the number of posts that should be displayed
  // (the number passed in to the function as the limit parameter)
  if (typeof limit === "number") {
    // If the limit parameter is a number, slice the array to only contain the first limit number of posts
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
