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

module.exports = router
