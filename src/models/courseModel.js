import mongoose from "mongoose";
// import moment from "moment";

const schema = new mongoose.Schema({


    courseId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null,
        required: false,

    }

})

export const ModelCourse = mongoose.model('Courses', schema)
// const doc = new ModelCourse({
//     courseId: 'K3',
//     name: 'Khóa C',

// });
// doc.save(function (error) {
//     // console.log(moment(new Date()).format('MM/DD/YYYY-h:mm:ss a'))

//     // console.log(error)
//     // assert.equal(error.errors['name'].message,
//     //     'Path `name` is required.');

//     // error = doc.validateSync();
//     // assert.equal(error.errors['name'].message,
//     //     'Path `name` is required.');
// });
