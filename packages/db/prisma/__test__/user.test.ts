import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(`TRUNCATE "User" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User model", () => {
  test("should create a user with valid email", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "John Doe",
      },
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe("test@example.com");
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  test("should enforce unique email constraint", async () => {
    await prisma.user.create({
      data: {
        email: "unique@example.com",
      },
    });

    await expect(
      prisma.user.create({
        data: {
          email: "unique@example.com",
        },
      }),
    ).rejects.toThrow();
  });

  test("should allow nullable name field", async () => {
    const user = await prisma.user.create({
      data: {
        email: "noname@example.com",
      },
    });

    expect(user.name).toBeNull();
  });
});
