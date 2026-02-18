export default (sequelize, DataTypes) => {
    const UserActiveState = sequelize.define("UserActiveState", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        currentModuleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentQuestionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moduleSessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    });
    return UserActiveState;
}