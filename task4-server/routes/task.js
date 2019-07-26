var express = require('express');
var router = express.Router();
const { Task } = require('../models/Task');

router.get('/', async function (req, res, next) {
    const todo = await Task.find().select({ descriptionOfTask: 1, date: 1, idOfFamilyMember: 1}).exec();
    res.send(todo);
});  

// router.get('/:id', async function (req, res, next) {
//     const { id } = req.params;
//     try {
//         const apartment = await Apartment.findById(id).exec();
//         res.send(apartment);
//     } catch (e) {
//         res.status(404).send('not found');
//     }
// });


// router.post('/', async (req, res) => {
//    const {name, price, type, rooms, image, amenities} = req.body;
//    const apartment = new Apartment({name, price, type, rooms, image, amenities});
//    try {
//        const document = await apartment.save();
//        res.status(200).send(document);
//    } catch (e) {
//         res.status(400).send(e);
//    }
// });
// router.delete('/:id', async function (req, res, next) {
//     const { id } = req.params;
//     try {
//         const apartment = await Apartment.deleteOne({"_id":id});
//         res.send(apartment)
//     } catch (e) {
//         res.status(404).send('not found');
//     }
// });

module.exports = router;