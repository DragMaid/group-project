import { PrismaClient } from "@prisma/client";
import {
  createTestUser,
  createTestPost,
  createTestSubject,
  createTestDepartment,
} from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(`TRUNCATE "Post" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Post model", () => {
  let post: any;

  test("should create a post entry with valid data", async () => {
    const user = await createTestUser();
    const department = await createTestDepartment();
    const subject = await createTestSubject(department.id);
    post = await createTestPost(user.id, subject.id, {
      name: "First Post",
      description: "This is the content of the first post.",
    });

    expect(post.id).toBeDefined();
    expect(post.name).toBe("First Post");
    expect(post.description).toBe("This is the content of the first post.");
  });

  test("Allow posts to have the same name and description", async () => {
    await expect(
      createTestPost(post.creatorId, post.subjectId, {
        name: post.name,
        description: post.description,
      }),
    ).resolves.toBeDefined();
  });
});
