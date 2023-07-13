const router = require('express').Router()
const controller = require('../controllers/NoteController')
const middleware = require('../middleware')

router.get(
  '/branches',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetBranches
)

router.get(
  '/notes',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetNotes
)

router.post(
  '/postnote',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateNote
)

router.post(
  '/postbranch',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateBranch
)

router.post(
  '/postnoteconnection/:note_id/:branch_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateNoteConnection
)

router.post(
  '/postbranchtobranchconnection/:parent_id/:child_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateB2BConnection
)

router.put(
  `/branchedit/:branch_id`,
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateBranch
)

router.put(
  '/noteedit/:note_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateNote
)

router.delete(
  '/notedelete/:note_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteNote
)

router.delete(
  '/branchdelete/:branch_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteBranch
)

router.post(
  '/branchmoveup/:branch_id/:branch_num',
  middleware.stripToken,
  middleware.verifyToken,
  controller.MoveBranchUp
)

router.post(
  '/branchmovedown/:branch_id/:branch_num',
  middleware.stripToken,
  middleware.verifyToken,
  controller.MoveBranchDown
)

module.exports = router
