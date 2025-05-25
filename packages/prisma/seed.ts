import { PrismaClient } from "@prisma/client";
import {
  createTestUser,
  createTestFollow,
  createTestSubject,
  createTestPost,
  createTestFile,
  createTestPostContent,
  createTestRating,
  createTestComment,
  createTestBookmark,
  createTestContentReport,
  createTestDepartment,
  createTestNotification,
} from "./testUtils.ts";

const prisma = new PrismaClient();

async function main() {
  // Step 1: Create Users
  const alice = await createTestUser({
    id: "alice@example.com",
    name: "Alice",
  });
  const bob = await createTestUser({ id: "bob@example.com", name: "Bob" });
  const charlie = await createTestUser({
    id: "charlie@example.com",
    name: "Charlie",
  });

  // Step 2: Create Follows
  await createTestFollow(bob.id, alice.id); // Bob follows Alice
  await createTestFollow(charlie.id, bob.id); // Charlie follows Bob

  // Step 3: Create Departments
  const itDepartment = await createTestDepartment({
    name: "IT",
    description: "Information Technology",
  });
  const hrDepartment = await createTestDepartment({
    name: "HR",
    description: "Human Resources",
  });

  // Step 4: Create Subjects
  const programmingSubject = await createTestSubject(itDepartment.id, {
    name: "Programming 101",
  });
  const managementSubject = await createTestSubject(hrDepartment.id, {
    name: "Management Basics",
  });

  // Step 5: Create Posts
  const post1 = await createTestPost(alice.id, programmingSubject.id, {
    name: "Introduction to Programming",
  });
  const post2 = await createTestPost(bob.id, managementSubject.id, {
    name: "Leadership Skills",
  });

  // Step 6: Create Files
  const file1 = await createTestFile({
    name: "intro.pdf",
    url: "storage/intro.pdf",
    type: "pdf",
    size: 500,
  });
  const file2 = await createTestFile({
    name: "leadership.pdf",
    url: "storage/leadership.pdf",
    type: "pdf",
    size: 700,
  });

  // Step 7: Create Post Contents
  await createTestPostContent(post1.id, file1.id);
  await createTestPostContent(post2.id, file2.id);

  // Step 8: Create Ratings
  await createTestRating(bob.id, post1.id, { score: 4 });
  await createTestRating(charlie.id, post1.id, { score: 5 });
  await createTestRating(alice.id, post2.id, { score: 3 });

  // Step 9: Create Comments
  await createTestComment(bob.id, post1.id, { content: "Great introduction!" });
  await createTestComment(charlie.id, post1.id, {
    content: "Very helpful, thanks!",
  });
  await createTestComment(alice.id, post2.id, {
    content: "Interesting perspective.",
  });

  // Step 10: Create Bookmarks
  await createTestBookmark(bob.id, post1.id, { name: "Programming Basics" });
  await createTestBookmark(charlie.id, post2.id, { name: "Leadership Guide" });

  // Step 11: Create Content Reports
  await createTestContentReport(charlie.id, post1.id, {
    header: "Typo in the content",
    description: "Found a typo in the introduction section.",
  });
  await createTestContentReport(alice.id, post2.id, {
    header: "Outdated information",
    description: "Some of the leadership principles are outdated.",
  });

  // Step 12: Create Notifications
  // (Assuming you have a function to create notifications)
  await createTestNotification(bob.id);
  await createTestNotification(charlie.id);
  await createTestNotification(alice.id);

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
