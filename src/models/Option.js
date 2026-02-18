export default (sequelize, DataTypes) => {
    const Option = sequelize.define("Option", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nextQuestionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nextModuleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return Option;
};