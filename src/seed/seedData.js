import db from "../models/index.js";

async function seed() {
  try {
    await db.sequelize.sync({ force: true });

    // Create User
    const user = await db.User.create({
      name: "Mrunali",
      email: "mrunali@example.com",
    });

    // Create Modules
    const careerModule = await db.Module.create({
      name: "Career Guidance",
      description: "Helps choose career path",
    });

    const techModule = await db.Module.create({
      name: "Tech Skills",
      description: "Technical skill evaluation",
    });

    // Create Questions
    const q1 = await db.Question.create({
      text: "Do you like coding?",
      moduleId: careerModule.id,
    });

    const q2 = await db.Question.create({
      text: "Which language do you prefer?",
      moduleId: careerModule.id,
      isCheckpoint: true,
    });

    const q3 = await db.Question.create({
      text: "Do you know JavaScript?",
      moduleId: techModule.id,
      isCheckpoint: true,
    });

    // Create Options
    await db.Option.create({
      text: "Yes",
      questionId: q1.id,
      nextQuestionId: q2.id,
    });

    await db.Option.create({
      text: "No",
      questionId: q1.id,
      nextModuleId: techModule.id,
    });

    await db.Option.create({
      text: "JavaScript",
      questionId: q2.id,
      nextModuleId: techModule.id,
    });

    await db.Option.create({
      text: "Yes",
      questionId: q3.id,
      nextQuestionId: null,
    });

    console.log("Seeding completed ✅");
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

seed();
