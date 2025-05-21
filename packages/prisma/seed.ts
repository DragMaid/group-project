import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // user.schema
  const alice = await prisma.user.create({
    data: {
      id: "alice@example.com",
      name: "Alice",
    },
  });
  const bob = await prisma.user.create({
    data: {
      id: "bob@example.com",
      name: "Bob",
    },
  });
  const bobFollowsAlice = await prisma.follow.create({
    data: {
      follower: {
        connect: { id: "bob@example.com" },
      },
      followed: {
        connect: { id: "alice@example.com" },
      },
    },
  });

  // categories.schema
  const subject = await prisma.subject.create({
    data: {
      name: "Programming 1",
      department: {
        create: {
          name: "IT",
        },
      },
    },
  });

  // notification.schema
  const notification = await prisma.notification.create({
    data: {
      header: "New mail",
      content: "This guy just mailed you",
      user: {
        connect: { id: "bob@example.com" },
      },
    },
  });

  // post.schema
  const post = await prisma.post.create({
    data: {
      name: "hello world",
      creator: {
        connect: { id: "bob@example.com" },
      },
      subject: {
        connect: { id: subject.id },
      },
    },
  });

  const file = await prisma.file.create({
    data: {
      name: "bob.txt",
      url: "storage/bob.txt",
      type: "text file",
      size: 200,
    },
  });

  const postContent = await prisma.postContent.create({
    data: {
      post: {
        connect: { id: post.id },
      },
      file: {
        connect: { id: file.id },
      },
    },
  });

  // post_actions.schema
  const rating = await prisma.rating.create({
    data: {
      user: {
        connect: { id: bob.id },
      },
      post: {
        connect: { id: post.id },
      },
      score: 5,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      user: {
        connect: { id: bob.id },
      },
      post: {
        connect: { id: post.id },
      },
      content: "hello world",
    },
  });

  const bookmark = await prisma.bookmark.create({
    data: {
      user: {
        connect: { id: bob.id },
      },
      post: {
        connect: { id: post.id },
      },
      name: "test bookmark",
    },
  });

  // report
  const report = prisma.contentReport.create({
    data: {
      user: {
        connect: { id: bob.id },
      },
      post: {
        connect: { id: post.id },
      },
      header: "Error sos",
      description: "Very important message",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
