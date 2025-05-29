import { PrismaClient, Follow } from "@prisma/client";
import { createTestUser } from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(`TRUNCATE "Follow" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Follow model", () => {
  let follow: Follow;

  test("should create a follow relationship", async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();
    follow = await prisma.follow.create({
      data: {
        followerId: user1.id,
        followingId: user2.id,
      },
    });
    expect(follow).toBeDefined();
    expect(follow.followerId).toBe(user1.id);
    expect(follow.followingId).toBe(user2.id);
    expect(follow.createdAt).toBeInstanceOf(Date);
  });

  test("should not allow duplicate follow relationships", async () => {
    await expect(
      prisma.follow.create({
        data: {
          followerId: follow.followerId,
          followingId: follow.followingId,
        },
      }),
    ).rejects.toThrow();
  });

  test("should allow reverse follow relationships", async () => {
    await expect(
      prisma.follow.create({
        data: {
          followerId: follow.followingId,
          followingId: follow.followerId,
        },
      }),
    ).resolves.toBeDefined();
  });
});
