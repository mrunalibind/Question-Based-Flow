import db from "../models/index.js";

export const submitAnswer = async (req, res) => {
    try {
        const { userId } = req.params;
        const { questionId, optionId } = req.body;

        // get active state 
        const activeState = await db.UserActiveState.findOne({ where: { userId } });
        if (!activeState) {
            return res.status(400).json({ message: "User has no active module" });
        }
        // console.log("Active state*******", activeState.currentModuleId);

        // validate current question
        if (activeState.currentQuestionId !== questionId) {
            return res.status(400).json({ 
                message: "This is not the current active question for the user", 
            });
        }

        // validate option belongs to question
        const option = await db.Option.findOne({ where: { id: optionId, questionId } });

        if (!option) {
            return res.status(400).json({ message: "Invalid Option Selected" });
        }

        // save conversation history
        await db.ConversationHistory.create({
            userId,
            moduleId: activeState.currentModuleId,
            questionId,
            optionId,
            moduleSessionId: activeState.moduleSessionId,
        });

        // get question details (to check if checkpoint and for response)
        const currentQuestion = await db.Question.findByPk(questionId);
        // console.log("Current question details:", currentQuestion);

        let newSessionId = activeState.moduleSessionId;

        // checkpoint logic - if current question is checkpoint, increment session id for the module
        if (currentQuestion.isCheckpoint) {

            newSessionId = activeState.moduleSessionId + 1;
            await db.UserActiveState.update(
                { moduleSessionId: newSessionId },
                { where: { userId } }
            );
            // console.log("newSessionId after checkpoint update:", newSessionId);
        }

        let nextQuestion = null;

        if (option.nextModuleId) {
            const firstQuestionOfNewModule = await db.Question.findOne({
                where: { moduleId: option.nextModuleId },
                order: [["id", "ASC"]],
                include: [db.Option],
            });

            if (!firstQuestionOfNewModule) {
                return res.status(404).json({ 
                    message: "Target module has no questions" 
                });
            }

            await db.UserActiveState.update(
                {
                    currentModuleId: option.nextModuleId,
                    currentQuestionId: firstQuestionOfNewModule.id,
                },
                { where: { userId } }
            );
            nextQuestion = firstQuestionOfNewModule;
        } else if (option.nextQuestionId) {
            const nextQuestionDetails = await db.Question.findByPk(option.nextQuestionId, {
                include: [db.Option],
            });
            if (!nextQuestionDetails) {
                return res.status(404).json({ 
                    message: "Next question not exist" 
                });
            }

            await db.UserActiveState.update(
                {
                    currentQuestionId: nextQuestionDetails.id,
                },
                { where: { userId } }
            );
            nextQuestion = nextQuestionDetails;
        } else {
            return res.status(200).json({ 
                message: "Module completed. No more questions.",    
            });
        }

        return res.status(200).json({
            message: "Answer submitted successfully",
            nextQuestion,
        });
    } catch (error) {
        console.error("Error submitting answer:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getQuestionByDeepLink = async (req, res) => {
    try {
        const { userId, questionId } = req.params;

        const activeState = await db.UserActiveState.findOne({ where: { userId } });
        if (!activeState) {
            return res.status(400).json({ 
                message: "User has no active Session" 
            });
        }

        // If deep link matches active question, return it
        if(parseInt(questionId) === activeState.currentQuestionId) {
            const question = await db.Question.findByPk(questionId, {
                include: [db.Option],
            });
            return res.status(200).json({ 
                message: "Valid Deep Link",
                question,
            });
        }

        // if deep link is outdated
        const currentQuestion = await db.Question.findByPk(
            activeState.currentQuestionId,
            {
                include: [db.Option],
            }
        );
        
        return res.status(200).json({ 
            message: "Outdated Deep Link. Returning latest valid question",
            question: currentQuestion,
        });
    }
    catch (error) {
        console.error("Error processing deep link:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const goBack = async (req, res) => {
    try {
        const { userId } = req.params;

        const activeState = await db.UserActiveState.findOne({ where: { userId } });
        if (!activeState) {
            return res.status(400).json({ 
                message: "User has no active Session" 
            });
        }

        // Find last answer in current module & session
        const lastAnswer = await db.ConversationHistory.findOne({
            where: {
                userId,
                // moduleId: activeState.currentModuleId,
                moduleSessionId: activeState.moduleSessionId,
            },
            order: [["createdAt", "DESC"]],
        });

        if (!lastAnswer) {
            return res.status(400).json({ 
                message: "No previous question to go back to", 
            });
        }

        // update active state to last question
        await db.UserActiveState.update(
            {
                currentQuestionId: lastAnswer.questionId,
            },
            { where: { userId } }
        );

        const previousQuestion = await db.Question.findByPk(lastAnswer.questionId, {
            include: [db.Option],
        });

        return res.status(200).json({
            message: "Moved back to previous question",
            question: previousQuestion,
        });
    } catch (error) {
        console.error("Error going back to previous question:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};