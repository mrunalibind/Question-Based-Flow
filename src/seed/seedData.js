import db from "../models/index.js";

async function seed() {
  try {
    await db.sequelize.sync({ force: true });

    // Create User
    const user = await db.User.create({
      name: "Mrunali",
      email: "mrunali@example.com",
    });

    // ---------------- MODULES ----------------
    const careerModule = await db.Module.create({
      name: "Career Guidance",
      description: "Helps choose career path",
    });

    const techModule = await db.Module.create({
      name: "Tech Skills",
      description: "Technical skill evaluation",
    });

    const softSkillModule = await db.Module.create({
      name: "Soft Skills",
      description: "Evaluate communication & leadership",
    });

    // ---------------- CAREER MODULE ----------------
    const c1 = await db.Question.create({
      text: "Do you like coding?",
      moduleId: careerModule.id,
    });

    const c2 = await db.Question.create({
      text: "Which language do you prefer?",
      moduleId: careerModule.id,
      isCheckpoint: true,
    });

    const c3 = await db.Question.create({
      text: "Do you enjoy problem solving?",
      moduleId: careerModule.id,
    });

    // ---------------- TECH MODULE ----------------
    const t1 = await db.Question.create({
      text: "Do you know JavaScript?",
      moduleId: techModule.id,
    });

    const t2 = await db.Question.create({
      text: "Have you worked with backend?",
      moduleId: techModule.id,
      isCheckpoint: true,
    });

    const t3 = await db.Question.create({
      text: "Do you know databases?",
      moduleId: techModule.id,
    });

    // ---------------- SOFT SKILL MODULE ----------------
    const s1 = await db.Question.create({
      text: "Do you enjoy public speaking?",
      moduleId: softSkillModule.id,
    });

    const s2 = await db.Question.create({
      text: "Do you prefer teamwork?",
      moduleId: softSkillModule.id,
      isCheckpoint: true,
    });

    // ---------------- OPTIONS ----------------

    // Career Module Options
    await db.Option.bulkCreate([
      { text: "Yes", questionId: c1.id, nextQuestionId: c2.id },
      { text: "No", questionId: c1.id, nextModuleId: softSkillModule.id },

      { text: "JavaScript", questionId: c2.id, nextModuleId: techModule.id },
      { text: "Python", questionId: c2.id, nextQuestionId: c3.id },

      { text: "Yes", questionId: c3.id, nextModuleId: techModule.id },
      { text: "No", questionId: c3.id, nextModuleId: softSkillModule.id },
    ]);

    // Tech Module Options
    await db.Option.bulkCreate([
      { text: "Yes", questionId: t1.id, nextQuestionId: t2.id },
      { text: "No", questionId: t1.id, nextModuleId: softSkillModule.id },

      { text: "Yes", questionId: t2.id, nextQuestionId: t3.id },
      { text: "No", questionId: t2.id, nextModuleId: careerModule.id },

      { text: "Yes", questionId: t3.id, nextQuestionId: null },
      { text: "No", questionId: t3.id, nextModuleId: softSkillModule.id },
    ]);

    // Soft Skill Module Options
    await db.Option.bulkCreate([
      { text: "Yes", questionId: s1.id, nextQuestionId: s2.id },
      { text: "No", questionId: s1.id, nextModuleId: careerModule.id },

      { text: "Yes", questionId: s2.id, nextQuestionId: null },
      { text: "No", questionId: s2.id, nextModuleId: techModule.id },
    ]);

    console.log("Seeding completed ✅");
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

seed();
