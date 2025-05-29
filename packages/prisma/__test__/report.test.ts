import { PrismaClient } from "@prisma/client";
import {
  createTestUser,
  createTestPost,
  createTestSubject,
  createTestDepartment,
  createTestContentReport,
} from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(
    `TRUNCATE "ContentReport" RESTART IDENTITY CASCADE;`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Report Models", () => {
  test("should create a content report for a post", async () => {
    const user = await createTestUser();
    const department = await createTestDepartment();
    const subject = await createTestSubject(department.id);
    const post = await createTestPost(user.id, subject.id);
    const report = await createTestContentReport(user.id, post.id, {
      header: "Test Report",
      description: "This is a test report description.",
    });
    expect(report.userId).toBe(user.id);
    expect(report.postId).toBe(post.id);
    expect(report.header).toBe("Test Report");
    expect(report.description).toBe("This is a test report description.");
  });
});
