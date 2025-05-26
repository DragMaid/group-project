import { PrismaClient, Department } from "@prisma/client";
import { createTestDepartment } from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(
    `TRUNCATE "Department" RESTART IDENTITY CASCADE;`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Department model", () => {
  let department: Department;

  test("should create a department record with valid data", async () => {
    department = await createTestDepartment({
      name: "Computer Science",
      description: "Description of Computer Science",
    });
    expect(department.id).toBeDefined();
    expect(department.name).toBe("Computer Science");
  });

  test("should enforce unique department name constraint", async () => {
    await expect(
      createTestDepartment({ name: department.name }),
    ).rejects.toThrow();
  });
});
