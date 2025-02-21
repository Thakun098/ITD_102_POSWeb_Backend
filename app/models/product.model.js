module.exports = (sequelize, dataType) => {
    const Product = sequelize.define("products", {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataType.STRING,
            allowNull: false
        },
        stock: {
            type: dataType.INTEGER,
            allowNull: false
        },
        price: {
            type: dataType.INTEGER,
            allowNull: false
        },
        category: {
            type: dataType.STRING,
            allowNull: false
        },
    });

    return Product;
};