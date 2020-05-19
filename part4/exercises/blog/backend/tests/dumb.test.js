const fixtures = require("./fixtures");
const dumb = require("./dumb");

describe("dumb", () => {
  test("something", () => {
    expect(dumb.dumb([])).toBe(1);
  });
});

describe("totalLikes", () => {
  test("given a list of blogs then totalLikes returns the sum of their likes", () => {
    expect(dumb.totalLikes(fixtures.blogs)).toEqual(18);
  });

  test("given a list with 1 blog then totalLikes returns the likes of that blog", () => {
    expect(dumb.totalLikes([fixtures.blogs[0]])).toBe(fixtures.blogs[0].likes);
  });

  test("given an empty list then totalLikes returns 0", () => {
    expect(dumb.totalLikes([])).toBe(0);
  });
});

describe("favoriteBlog", () => {
  test("blog with most likes is considered the favorite", () => {
    expect(dumb.favoriteBlog(fixtures.blogs)).toEqual({
      title: "Something something",
      author: "A. Person",
      likes: 9,
    });
  });

  test("only blog in list is the favorite", () => {
    expect(dumb.favoriteBlog([fixtures.blogs[0]])).toEqual({
      title: fixtures.blogs[0].title,
      author: fixtures.blogs[0].author,
      likes: fixtures.blogs[0].likes,
    });
  });

  test("empty list has no favorite", () => {
    expect(dumb.favoriteBlog([])).toEqual({});
  });
});

describe("mostBlogs", () => {
  test("dijkstra has the most blogs", () => {
    const result = dumb.mostBlogs(fixtures.blogs);
    expect(result.author).toEqual("Edsger W. Dijkstra");
    expect(result.blogs).toEqual(2);
  });

  test("author of the only blog in list has the most blogs", () => {
    const result = dumb.mostBlogs([fixtures.blogs[0]]);
    expect(result.author).toEqual(fixtures.blogs[0].author);
    expect(result.blogs).toEqual(1);
  });

  test("cannot find author with most blogs in empty list", () => {
    expect(dumb.mostBlogs).toThrow();
  });
});

describe("mostLikes", () => {
  test("'a. person' has the most blogs", () => {
    const result = dumb.mostLikes(fixtures.blogs);
    expect(result.author).toEqual("A. Person");
    expect(result.likes).toEqual(9);
  });

  test("author of the only blog has the most likes", () => {
    const result = dumb.mostLikes([fixtures.blogs[0]]);
    expect(result.author).toEqual(fixtures.blogs[0].author);
    expect(result.likes).toEqual(fixtures.blogs[0].likes);
  });

  test("cannot find author with most likes in empty list", () => {
    expect(dumb.mostLikes).toThrow();
  });
});
