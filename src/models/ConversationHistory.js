export default (sequelize, DataTypes) => {
    const ConversationHistory = sequelize.define("ConversationHistory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moduleSessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });
    return ConversationHistory;
}