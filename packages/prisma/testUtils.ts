import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/**
 * Utility function to create a test user with default values.
 */
export async function createTestUser(overrides = {}) {
  return await prisma.user.create({
    data: {
      id: faker.internet.email(),
      name: faker.person.fullName(),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test department with default values.
 */
export async function createTestDepartment(overrides = {}) {
  return await prisma.department.create({
    data: {
      name: faker.commerce.department(),
      description: faker.lorem.paragraph(),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test subject with a department and default values.
 */
export async function createTestSubject(departmentId: number, overrides = {}) {
  return await prisma.subject.create({
    data: {
      id: faker.internet.email(),
      name: faker.person.fullName(),
      department: {
        connect: { id: departmentId },
      },
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test post with default values.
 */
export async function createTestPost(
  creatorId: string,
  subjectId: string,
  overrides = {},
) {
  return await prisma.post.create({
    data: {
      name: faker.lorem.sentence(),
      creator: {
        connect: { id: creatorId },
      },
      subject: {
        connect: { id: subjectId },
      },
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test file with default values.
 */
export async function createTestFile(overrides = {}) {
  return await prisma.file.create({
    data: {
      name: faker.system.fileName(),
      url: faker.internet.url(),
      type: faker.system.fileType(),
      size: faker.number.int({ min: 100, max: 10000 }),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test post content with default values.
 */
export async function createTestPostContent(
  postId: string,
  fileId: string,
  overrides = {},
) {
  return await prisma.postContent.create({
    data: {
      post: {
        connect: { id: postId },
      },
      file: {
        connect: { id: fileId },
      },
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test rating with default values.
 */
export async function createTestRating(
  userId: string,
  postId: string,
  overrides = {},
) {
  return await prisma.rating.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
      score: faker.number.int({ min: 1, max: 5 }),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test comment with default values.
 */
export async function createTestComment(
  userId: string,
  postId: string,
  overrides = {},
) {
  return await prisma.comment.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
      content: faker.lorem.paragraph(),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test bookmark with default values.
 */
export async function createTestBookmark(
  userId: string,
  postId: string,
  overrides = {},
) {
  return await prisma.bookmark.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
      name: faker.lorem.words(3),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test content report with default values.
 */
export async function createTestContentReport(
  userId: string,
  postId: string,
  overrides = {},
) {
  return await prisma.contentReport.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
      header: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test follow with default values.
 */
export async function createTestFollow(
  followerId: string,
  followingId: string,
  overrides = {},
) {
  return await prisma.follow.create({
    data: {
      follower: {
        connect: { id: followerId },
      },
      following: {
        connect: { id: followingId },
      },
      ...overrides,
    },
  });
}

/**
 * Utility function to create a test notification with default values.
 */
export async function createTestNotification(userId: string, overrides = {}) {
  return await prisma.notification.create({
    data: {
      header: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      user: {
        connect: { id: userId },
      },
      ...overrides,
    },
  });
}
