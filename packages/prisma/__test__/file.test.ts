import { PrismaClient } from "@prisma/client";
import { createTestFile } from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(`TRUNCATE "File" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("File model", () => {
  let file: any;

  test("should create a file with valid data", async () => {
    const name = "example.txt";
    const type = "text/plain";
    const size = 1024;
    const url = "http://example.com/example.txt";
    file = await createTestFile({
      name: name,
      type: type,
      size: size,
      url: url,
    });
    expect(file.id).toBeDefined();
    expect(file.name).toBe(name);
    expect(file.type).toBe(type);
    expect(file.size).toBe(size);
    expect(file.url).toBe(url);
  });

  test("should enforce unique file name constraint", async () => {
    await expect(
      createTestFile({
        name: "unique.txt",
        type: "text/plain",
        size: 2048,
        url: file.url,
      }),
    ).rejects.toThrow();
  });
});
