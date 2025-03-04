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
        if (!req.body.Reportedissues) {
            res.status(400).json({ message: "Not empty!" })
            return
        };

        const newProduct = {
            Reportedissues: req.body.Reportedissues, //รับ Data มาจาก Frontend
            Notificationdate: req.body.Notificationdate, //รับ Data มาจาก Frontend
            note: req.body.note, //รับ Data มาจาก Frontend    
            Problematicplaces: req.body.Problematicplaces
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
            Reportedissues: req.body.Reportedissues, 
            Notificationdate: req.body.Notificationdate, 
            note: req.body.note,
            Problematicplaces: req.body.Problematicplaces   
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