# 🔄 Agile Workflow – Scrumban Framework with Jira

This document outlines the **Agile Scrumban** process our team follows and how it integrates with **Jira** for efficient planning, tracking, and delivery.

---

## 🧠 What is Scrumban?

**Scrumban** is a hybrid Agile methodology that combines the **structured planning of Scrum** with the **flexibility and flow of Kanban**.

It helps us:
- Plan work in **iterations**
- Manage work in **continuous flow**
- Respond to change quickly
- Reduce **WIP (Work In Progress) overload**
- Visualize our workflow clearly via **boards**

---

## 🧱 Key Principles

- **Pull-based work**: No new task is started unless capacity is available
- **Work in Progress limits (WIP)**: To prevent overload and context switching
- **Continuous improvement**: Regular retrospectives
- **Daily standups**: For team sync
- **Weekly planning**: High-level goals
- **Visual board (Jira)**: For all tasks/states

---

## 🧰 Tools Used

| Tool     | Purpose                          |
|----------|----------------------------------|
| **Jira** | Task tracking & board management |
| **Slack**| Team communication               |
| **Git**  | Version control                  |
| **Docker** | Dev environment/testing        |

---

## 📋 Jira Workflow States

All tasks in Jira will follow this **custom Scrumban board flow**:

```
Backlog → Ready → In Progress → Code Review → Testing → Done
```

| Status         | Meaning                                |
|----------------|----------------------------------------|
| **Backlog**    | Prioritized but not yet planned        |
| **Ready**      | Approved to be picked up (in scope)    |
| **In Progress**| Actively being worked on               |
| **Code Review**| Awaiting or undergoing code review     |
| **Testing**    | QA/staging testing before merge        |
| **Done**       | Completed and verified in dev/main     |

---

## 🚦 Work in Progress (WIP) Limits

To maintain quality and focus:

| Column        | Max Tasks Per Dev |
|---------------|-------------------|
| In Progress   | 2                 |
| Code Review   | 2                 |
| Testing       | 1                 |

> Tasks should not move forward if the next column is full. Communicate and unblock before pulling more work.

---

## 🔁 Weekly Cycle (Example)

| Day         | Activity                                  |
|-------------|-------------------------------------------|
| Monday      | Planning session + prioritize backlog     |
| Daily       | 15-min standup (Slack or call)            |
| Throughout  | Tasks move through Jira board             |
| Friday      | Retrospective + deploy completed features |

---

## 📌 Workflow Summary

1. **Planning**:
   - PM/Lead selects tasks for the week from **Backlog** → moves to **Ready**
   - Team clarifies scope/estimates

2. **Development**:
   - Dev picks a task from **Ready**, moves to **In Progress**
   - When done, moves task to **Code Review** and opens PR
   - After review, moves to **Testing**

3. **Testing/Verification**:
   - Once approved, QA or dev runs manual checks (Docker preview, etc.)
   - If passes, task is moved to **Done**

4. **Retrospective**:
   - Discuss blockers, improvements, team feedback
   - Update any Jira automation/WIP rules if needed

---

## ✅ Best Practices

- **Never skip Jira updates** — keep task statuses accurate
- **Only 1 task in “In Progress” per dev**
- **Use meaningful titles and clear acceptance criteria**
- **Tag teammates in Jira comments or Slack for review**
- **Log all bugfixes as separate tasks**

---

## 🧾 Summary

| Rule                                | Required |
|-------------------------------------|----------|
| Follow Jira workflow                | ✅ Yes |
| WIP limits enforced                 | ✅ Yes |
| Pull work only when ready           | ✅ Yes |
| Daily standups                      | ✅ Yes |
| PRs reviewed before merging         | ✅ Yes |
| Retrospectives at end of week       | ✅ Yes |

---

Let’s build with flow and focus. 🛠️🚀
