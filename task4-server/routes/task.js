var express = require('express');
var router = express.Router();
const {
    Task
} = require('../models/Task');
const {
    Member
} = require('../models/Member');

router.get('/', async function (req, res, next) {
    let newtodos = [];
    const todo = await Task.find().select({
        descriptionOfTask: 1,
        date: 1,
        idOfFamilyMember: 1
    }).exec();
    console.log(todo[0].idOfFamilyMember)
    const members = await Member.find().select({
        _id: 1,
        name: 1
    }).exec();
    todo.map(one => {
        for (let index = 0; index < members.length; index++) {
            if (one.idOfFamilyMember == members[index]._id) {
                newtodos = [...newtodos, {
                    _id:one._id,
                    descriptionOfTask: one.descriptionOfTask,
                    date: one.date,
                    name: members[index].name
                }]

            }
        }

    })

    console.log(newtodos)

    res.send(newtodos);

});
router.delete('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
        const task = await Task.deleteOne({"_id":id});
        res.send(task)
    } catch (e) {
        res.status(404).send('not found');
    }
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


router.post('/', async (req, res) => {
    const {
        descriptionOfTask,
        date,
        name
    } = req.body;
    console.log(descriptionOfTask,date,name)
    let idOfFamilyMember='';
    const members = await Member.find().select({
        _id: 1,
        name: 1
    }).exec();
    let i = 0
    members.map(one => {
        
            if (one.name == name) {
                idOfFamilyMember = one._id;
            
        }

    })
    const task = new Task({
        descriptionOfTask,
        date,
        idOfFamilyMember,
        
       
    });
    console.log(task)
    try {
        const document = await task.save();
        res.status(200).send(document);
    } catch (e) {
        res.status(400).send(e);
    }
});
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