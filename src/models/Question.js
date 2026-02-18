export default (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isCheckpoint: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Question;
}