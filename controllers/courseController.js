const Department = require('../models/department')

exports.addCourse = async (req, res, next) => {
  const { deptId, semId } = req.query
  const { title, courseCode } = req.body
  const department = await Department.findById(deptId)

  if (!department) {
    res.json({
      success: false,
      msg: 'Department is missing !',
      givenData: {
        title,
        courseCode,
        deptId,
        semId,
      },
    })
  } else {
    const semIndex = await department.semesters.findIndex(
      (item) => item._id.toString() === semId
    )
    await department.semesters[semIndex].courses.push({ title, courseCode })
    await department.save(async (err, doc) => {
      if (!err) {
        const courseData = await doc.semesters[semIndex]?.courses
        res.json({
          success: true,
          msg: 'Successfully created a course !',
          courseData,
          department: doc,
          givenData: { deptId, semId, title, courseCode },
        })
      }
    })
  }
}

exports.updateCourse = async (req, res, next) => {
  const { _id, title, courseCode } = req.body
  const { deptId, semId } = req.query
  const department = await Department.findById(deptId)
  const semIndex = await department.semesters.findIndex(
    (item) => item._id.toString() === semId
  )
  await department.semesters[semIndex]?.courses.map((item) => {
    if (item._id.toString() === _id) {
      item['title'] = title
      item['courseCode'] = courseCode
    }
  })

  department.save(async (err, doc) => {
    if (err) {
      res.json({
        success: false,
        msg: "Something went wrong !Couldn't update !",
        givenData: { _id, title, courseCode, deptId, semId },
      })
    } else {
      const courseData = await doc.semesters[semIndex]?.courses
      res.json({
        success: true,
        msg: 'Successfully updated !',
        courseData,
        givenData: { _id, title, courseCode, deptId, semId },
      })
    }
  })
}

exports.deleteCourse = async (req, res, next) => {
  const { deptId, semId, _id } = req.query
  if (!deptId || !semId || !_id) {
    res.json({
      success: false,
      msg: 'Query parameters are missing',
    })
  } else {
    const department = await Department.findById(deptId)
    const semIndex = await department.semesters.findIndex(
      (item) => item._id.toString() === semId
    )
    const corIndex = await department.semesters[semIndex]?.courses.findIndex(
      (item) => item._id.toString() === _id
    )
    if (corIndex > -1) {
      // Removing object from array
      await department.semesters[semIndex].courses.splice(corIndex, 1)
    }
    department.save(async (err, doc) => {
      if (err) {
        res.json({
          success: false,
          msg: "Something went wrong ! Couldn't delete .",
          givenData: {
            deptId,
            semId,
            _id,
            semIndex,
            corIndex,
          },
        })
      } else {
        const courseData = await doc.semesters[semIndex]?.courses
        res.json({
          success: true,
          msg: 'Successfully Deleted !',
          courseData,
          givenData: {
            deptId,
            semId,
            _id,
            semIndex,
            corIndex,
          },
        })
      }
    })
  }
}
