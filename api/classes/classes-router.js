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


router.delete('/:class_id', (req, res, next) => {
    const { class_id } = req.params
    Class.remove(class_id)
        .then()
        .catch(next)
})

module.exports = router
