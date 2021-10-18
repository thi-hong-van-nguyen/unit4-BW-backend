const router = require('express').Router()
const Class = require('./classes-model')
const md = require('./classes-middleware')

router.get('/', (req, res, next) => {
    Class.findAll()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)

})

router.post('/', md.checkClassPayload, (req, res, next) => {
    Class.add(req.body)
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)
})

router.put('/:class_id', md.checkClassExist, md.checkClassPayload, (req, res, next) => {
    const { class_id } = req.params
    const classToUpdate = req.body
    Class.update(class_id, classToUpdate)
        .then(updatedClass => {
            res.status(200).json({
                message: 'updated successfully',
                updatedClass
            })
        })
        .catch(next)
})

router.delete('/:class_id', md.checkClassExist, (req, res, next) => {
    const { class_id } = req.params
    Class.remove(class_id)
        .then(deletedClass => {
            res.status(200).json({
                message: `class with id ${class_id} has been deleted!`,
                deletedClass
            })
        })
        .catch(next)
})

module.exports = router
