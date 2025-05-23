import { PrismaClient } from "@prisma/client";
import {
  createTestUser,
  createTestPost,
  createTestSubject,
  createTestDepartment,
  createTestFile,
  createTestPostContent,
} from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(
    `TRUNCATE "PostContent" RESTART IDENTITY CASCADE;`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Post Content model", () => {
  let postContent: any;

  test("should create a post content with valid data", async () => {
    const user = await createTestUser();
    const department = await createTestDepartment();
    const subject = await createTestSubject(department.id);
    const post = await createTestPost(user.id, subject.id);
    const file = await createTestFile();
    postContent = await createTestPostContent(post.id, file.id);
    expect(postContent.postId).toBe(post.id);
    expect(postContent.fileId).toBe(file.id);
  });

  test("should enforce unique post content constraint", async () => {
    // Attempt to create a duplicate PostContent
    await expect(
      createTestPostContent(postContent.postId, postContent.fileId),
    ).rejects.toThrow();
  });
});
