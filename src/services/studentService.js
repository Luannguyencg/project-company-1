import { ModelStudent } from '../models/listStudentModel.js'

export const getStudentService = (courseId, page, limit, searchText) => {
    return new Promise(async (resolve, reject) => {


        const startIndex = (page - 1) * limit
        const endIndex = page + limit
        const results = {}
        let countItem = await ModelStudent.countDocuments().exec()
        // console.log('check --------------', res)
        if (countItem === 0) {
            results.currentPage = 1
        }
        if (countItem % limit === 0) {
            results.currentPage = countItem / limit
        } else {
            results.currentPage = Math.floor(countItem / limit) + 1
        }

        if (endIndex <= countItem) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            // / search by input ...... !== all
            if (courseId && page &&
                limit && courseId !== 'all'
                && searchText && searchText !== 'undefined'
            ) {
                // console.log('check !== all:', searchText)

                let resFilter = []
                let res = await ModelStudent.find({}).where('courseId', courseId).sort({ _id: -1 }).exec()
                // console.log(res)
                if (res && res.length) {
                    resFilter = res.filter(item => {
                        return item.lastName.includes(searchText)
                            || item.firstName.includes(searchText)
                    })



                }
                // console.log('check resFilter',)
                countItem = resFilter.length
                results.results = resFilter.slice(startIndex, endIndex)

                if (countItem === 0) {
                    results.currentPage = 1
                }
                if (countItem % limit === 0) {
                    results.currentPage = countItem / limit
                } else {
                    results.currentPage = Math.floor(countItem / limit) + 1
                }
                resolve({
                    errCode: 0,
                    data: results
                })

            }

            /// search by input ...... == all 
            if (courseId && page &&
                limit && courseId === 'all'
                && searchText && searchText !== 'undefined'
            ) {
                // console.log('check text search courseId === all :', courseId)
                let resFilter = []
                let res = await ModelStudent.find({}).sort({ _id: -1 }).exec()
                if (res && res.length) {
                    resFilter = res.filter(item => {
                        return item.lastName.includes(searchText)
                            || item.firstName.includes(searchText)
                    })
                }
                countItem = resFilter.length
                results.results = resFilter.slice(startIndex, endIndex)

                if (countItem === 0) {
                    results.currentPage = 1
                }
                if (countItem % limit === 0) {
                    results.currentPage = countItem / limit
                } else {
                    results.currentPage = Math.floor(countItem / limit) + 1
                }
                resolve({
                    errCode: 0,
                    data: results
                })


            }


            // /// search student by course id
            if (courseId && page && limit && courseId !== 'all' && searchText == 'undefined') {
                // console.log('check text search !== ALl :', searchText)
                results.results = await ModelStudent.find({}).where('courseId', courseId).sort({ _id: -1 }).limit(limit).skip(startIndex).exec()
                countItem = await ModelStudent.find({}).where('courseId', courseId).countDocuments().exec()
                if (countItem === 0) {
                    results.currentPage = 1
                }
                if (countItem % limit === 0) {
                    results.currentPage = countItem / limit
                } else {
                    results.currentPage = Math.floor(countItem / limit) + 1
                }
                resolve({
                    errCode: 0,
                    data: results
                })

            }
            /// search input , all

            ////// search all student 
            results.results = await ModelStudent.find().sort({ _id: -1 }).limit(limit).skip(startIndex).exec()

            // console.log(results)
            resolve({
                errCode: 0,
                data: results
            })

        } catch (e) {

            reject(e)
        }
    })
}
export const createNewStudentService = (file, dataCreate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataCreate.email || !dataCreate.firstName ||
                !dataCreate.lastName || !dataCreate.birthDate ||
                !dataCreate.phoneNumber || !dataCreate.courseId
            ) {
                resolve({
                    errcode: -1,
                    errMsg: 'Missing required parameter'
                })
            }
            let res = await ModelStudent.findOne({
                email: dataCreate.email
            })

            if (res) {
                resolve({
                    errCode: 2,
                    errMsg: 'Your email already has users'
                })
            }
            let data = new ModelStudent({
                ...dataCreate,
                avata: file.filename
            })
            await data.save()



            resolve({
                errCode: 0,
                errMessage: 'create success'
            })

        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
export const updatStudentService = (file, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!file) {
                await ModelStudent.findOneAndUpdate({ _id: updateData._id }, updateData, { new: true })
                resolve({
                    errCode: 0,
                    errMessage: 'update success'
                })
            } else {
                await ModelStudent.findOneAndUpdate({ _id: updateData._id }, { ...updateData, avata: file.filename }, { new: true })
                resolve({
                    errCode: 0,
                    errMessage: 'update success'
                })
            }


        } catch (e) {

            reject(e);
        }
    })
}

export const deleteStudentService = (deleteId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ModelStudent.findOneAndRemove({ _id: deleteId });
            resolve({
                errCode: 0,
                errMessage: 'delete post success'
            })
        } catch (e) {
            reject(e);
        }
    })
}
