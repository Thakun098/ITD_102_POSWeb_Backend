const db = require('../models');
const user = db.user;

exports.findAllProduct = (req, res) => {//This is API for get all user
    //res.send("Find");
    try {
        user.findAll() //เป้น Method ของ Sequelize ที่ใช้ในการดึงข้อมูลทั้งหมดจาก Database
            .then(data => {
                res.json(data); //ส่งข้อมูลทั้งหมดที่ดึงมาจาก Database กลับไปที่ Frontend
            })
            .catch(error => {
                res.json({ message: error.message }); //แสดง Error ที่เกิดขึ้น
            });

    } catch (error) {
        console.log(error);
    }
};

exports.createProduct = (req, res) => { //This is API for create user
    try {
        if (!req.body.name) {
            res.status(400).json({ message: "Not empty!" })
            return
        };

        const newProduct = {
            name: req.body.name, //รับ Data มาจาก Frontend
            price: req.body.price, //รับ Data มาจาก Frontend
            stock: req.body.stock, //รับ Data มาจาก Frontend    
            category: req.body.category
        }
        user.create(newProduct) //เรียกใช้งาน Model ที่เราสร้างไว้ และนำไปใช้สร้าง table ใน Database
            .then(data => {
                res.status(200).json({ message: "Product created!" }) //
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            });

    } catch (error) {
        console.log(error.message)
    };
};

exports.findProductById = (req, res) => {
    try {
        const id = req.params.id; //รับค่า id ที่ส่งมาจาก Frontend
        user.findByPk(id) //ใช้ Sequelize ในการหาจาก ID ที่รับมา
            .then(data => {
                res.status(200).json(data); //ถ้าเจอ ส่ง Status 200 พร้อมกับข้อมูลจากที่ดึงมา
            })
            .catch(err => {
                res.status(404).json({message:'error'}) //ถ้าไม่เจอ ส่ง Status 404 Not found
            })

    } catch (error) {
        console.log(error.message);

    }


};

exports.updateProductById = (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = {
            name: req.body.name, 
            price: req.body.price, 
            stock: req.body.stock,
            category: req.body.category   
        }
        user.update(updateProduct, { where: { id: id } })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({ message: "Updated Succesfully!" })
                }
                else {
                    res.status(400).json({ message: "Updated Failed!" })
                }

            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    } catch (error) {
        console.log(error);

    }
};

exports.deleteProductById = (req, res) => {
    try {
        const id = req.params.id;
        user
            .destroy({ where: { id: id } })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({ message: "Product deleted Successfully!" });
                }
                else {
                    res.status(200).json({ message: "Product deleted Failed!" });
                }
            })
            .catch(err => {
                res.status(404).json({ message: err.message })
            });

    } catch (err) {
        console.log(err);
    }
};