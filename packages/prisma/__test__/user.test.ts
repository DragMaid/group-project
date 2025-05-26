import { PrismaClient, User } from "@prisma/client";
import { createTestUser } from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(`TRUNCATE "User" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User model", () => {
  let user: User;

  test("should create a user with valid email", async () => {
    user = await createTestUser({
      id: "test@example.com",
      name: "John Doe",
    });
    expect(user.id).toBeDefined();
    expect(user.id).toBe("test@example.com");
    expect(user.name).toBe("John Doe");
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  test("should enforce unique email constraint", async () => {
    await expect(
      createTestUser({
        id: user.id,
        name: "Alice",
      }),
    ).rejects.toThrow();
  });
});
