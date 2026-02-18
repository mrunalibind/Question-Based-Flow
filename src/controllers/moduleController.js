import db from "../models/index.js";

export const startModule = async (req, res) => {
    try {
        const { userId } = req.body;
        const { moduleId } = req.params;
        console.log("Starting module for userId:", userId, "moduleId:", moduleId);
        // Check if user exists
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if module exists
        const module = await db.Module.findByPk(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        // get first question of the module (smallest id)
        const firstQuestion = await db.Question.findOne({
            where: { moduleId },
            order: [["id", "ASC"]],
            include: [db.Option],
        });

        console.log("First question fetched:", firstQuestion);

        if (!firstQuestion) {
            return res.status(404).json({ message: "No questions found for this module" });
        }

        console.log("Module***********", moduleId)
        // Create or update UserActiveState
        await db.UserActiveState.upsert({
            userId,
            currentModuleId: moduleId,
            currentQuestionId: firstQuestion.id,
        });

        return res.status(200).json({
            message: "Module started successfully",
            question: firstQuestion,
        });
    } catch (error) {
        console.error("Error starting module:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};