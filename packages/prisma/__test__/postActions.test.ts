import { PrismaClient, User, Post } from "@prisma/client";
import {
  createTestUser,
  createTestPost,
  createTestSubject,
  createTestDepartment,
  createTestRating,
  createTestComment,
  createTestBookmark,
} from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(
    `TRUNCATE "Rating", "Comment", "Bookmark" RESTART IDENTITY CASCADE;`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Post Actions models", () => {
  let user: User;
  let post: Post;

  test("should create a rating for a post", async () => {
    user = await createTestUser();
    const department = await createTestDepartment();
    const subject = await createTestSubject(department.id);
    post = await createTestPost(user.id, subject.id);
    const rating = await createTestRating(user.id, post.id, { score: 4 });

    expect(rating.userId).toBe(user.id);
    expect(rating.postId).toBe(post.id);
    expect(rating.score).toBe(4);
  });

  test("should create a comment for a post", async () => {
    const comment = await createTestComment(user.id, post.id, {
      content: "This is a test comment.",
    });

    expect(comment.userId).toBe(user.id);
    expect(comment.postId).toBe(post.id);
    expect(comment.content).toBe("This is a test comment.");
  });

  test("should create a bookmark for a post", async () => {
    const bookmark = await createTestBookmark(user.id, post.id, {
      name: "Test Bookmark",
    });

    expect(bookmark.userId).toBe(user.id);
    expect(bookmark.postId).toBe(post.id);
    expect(bookmark.name).toBe("Test Bookmark");
  });
});
