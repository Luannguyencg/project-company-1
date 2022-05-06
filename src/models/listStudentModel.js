import mongoose from "mongoose";
// import moment from "moment";
const validateEmail = function (email) {
    var res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email)
};
const validatePhoneNumber = (phoneNumber) => {
    let res = /^[0-9]{10}$/;
    return res.test(phoneNumber)
}
const schema = new mongoose.Schema({
    avata: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: [
            validatePhoneNumber,
            'phone number is not a valid 10 digit number!'
        ]

    },
    courseId: {
        type: String,
        required: true,

    },
    // stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
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

export const ModelStudent = mongoose.model('Students', schema)
// const doc = new ModelStudent({
//     email: 'luannguyen58123456789@gmail.com',
//     firstName: 'Tùng',
//     lastName: 'Sơn',
//     birthDate: '10/11/2012',
//     phoneNumber: '0123456789',
//     courseId: 'K3'
// });


// doc.save()
// doc.save(function (error) {
//     // console.log(moment(new Date()).format('MM/DD/YYYY-h:mm:ss a'))

//     console.log('--------', error)
//     // assert.equal(error.errors['name'].message,
//     //     'Path `name` is required.');

//     // error = doc.validateSync();
//     // assert.equal(error.errors['name'].message,
//     //     'Path `name` is required.');
// });