module.exports = (sequelize, dataType) => {
    const Product = sequelize.define("CityFix", {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Reportedissues: {
            type: dataType.STRING,
            allowNull: false
        },
        Notificationdate: {
            type: dataType.STRING,
            allowNull: false
        },
        note: {
            type: dataType.STRING,
            allowNull: false
        },
        Problematicplaces: {
            type: dataType.STRING,
            allowNull: false
        },
    });

    return Product;
};