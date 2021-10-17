const yup = require('yup')


const classSchema = yup.object().shape({
    class_type: yup
        .string()
        .strict(true)
        .trim()
        .required('class type is required'),
    class_location: yup
        .string()
        .strict(true)
        .trim()
        .required('location is required'),
    class_date: yup
        .string()
        .strict(true)
        .trim()
        .required('date is required'),
    class_time: yup
        .string()
        .strict(true)
        .trim()
        .required('time is required'),
    class_duration: yup
        .number()
        .strict(true)
        .required('class duration is required'),
    intensity_level: yup
        .number()
        .strict(true)
})

async function checkClassPayload(req, res, next) {
    try {
        let validated = await classSchema.validate(req.body)
        req.body = validated
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}



module.exports = {
    checkClassPayload,

}
