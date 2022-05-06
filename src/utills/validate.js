export const validateForm = (values) => {
    const errors = {};
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const regexFirstNname = /^[A-Z]\w*$/
    if (!values.email) {
        errors.email = 'Email is required!'
    } else if (!regexEmail.test(values.email)) {
        errors.email = 'This is not a valid email format!'
    }
    if (!values.firstName) {
        errors.firstName = 'First name is required!'
    }
    //  else if (!regexFirstNname.test(values.firstName)) {
    //     errors.firstName = 'The first character of the name must be capitalized'
    // }
    if (!values.lastName) {
        errors.lastName = 'Last name is required!'
    }
    if (!values.birthDate) {
        errors.birthDate = 'Please enter your birth date!'
    }
    if (!values.courseId) {
        errors.courseId = 'Please chosse a course!'
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phonenumber is required!'
    } else if (values.phoneNumber.length < 9) {
        errors.phoneNumber = 'Phonenumber must be more than 9 characters!'
    } else if (values.phoneNumber.length > 10) {
        errors.phoneNumber = 'Phonenumber cannot exceed more than 10 characters!'
    }

    return errors
}