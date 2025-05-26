import { PrismaClient, Department, Subject } from "@prisma/client";
import { createTestDepartment, createTestSubject } from "../testUtils";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset the database before tests run (use with caution in non-test env)
  await prisma.$executeRawUnsafe(
    `TRUNCATE "Subject" RESTART IDENTITY CASCADE;`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Subject model", () => {
  let department: Department;
  let subject: Subject;

  test("should create a subject with valid data", async () => {
    department = await createTestDepartment();
    subject = await createTestSubject(department.id, {
      id: "CP1401",
      name: "Programming 1",
    });

    expect(subject.id).toBeDefined();
    expect(subject.id).toBe("CP1401");
    expect(subject.name).toBe("Programming 1");
  });

  test("should enforce unique subject ID constraint", async () => {
    await expect(
      createTestSubject(department.id, {
        id: subject.id,
        name: subject.name,
      }),
    ).rejects.toThrow();
  });
});
