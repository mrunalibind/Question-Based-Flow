import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Module from "./Module.js";
import Question from "./Question.js";
import Option from "./Option.js";
import UserActiveState from "./UserActiveState.js";
import ConversationHistory from "./ConversationHistory.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);
db.Module = Module(sequelize, Sequelize);
db.Question = Question(sequelize, Sequelize);
db.Option = Option(sequelize, Sequelize);
db.UserActiveState = UserActiveState(sequelize, Sequelize);
db.ConversationHistory = ConversationHistory(sequelize, Sequelize);

// Define associations
// Module has many Questions, Question belongs to Module
db.Module.hasMany(db.Question, { foreignKey: "moduleId" });
db.Question.belongsTo(db.Module, { foreignKey: "moduleId" });

// Question has many Options, Option belongs to Question
db.Question.hasMany(db.Option, { foreignKey: "questionId" });
db.Option.belongsTo(db.Question, { foreignKey: "questionId" });

// User has one UserActiveState, UserActiveState belongs to User
db.User.hasOne(db.UserActiveState, { foreignKey: "userId" });
db.UserActiveState.belongsTo(db.User, { foreignKey: "userId" });

// User has many ConversationHistory, ConversationHistory belongs to User
db.User.hasMany(db.ConversationHistory, { foreignKey: "userId" });
db.ConversationHistory.belongsTo(db.User, { foreignKey: "userId" });

// ConversationHistory belongs to Question, ConversationHistory belongs to Option
db.ConversationHistory.belongsTo(db.Question, { foreignKey: "questionId" });
db.ConversationHistory.belongsTo(db.Option, { foreignKey: "optionId" });

export default db;