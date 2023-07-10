const router = require('express').Router()
const controller = require('../controllers/NoteController')
const middleware = require('../middleware')

router.get('/', controller.GetNotes)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateNote
)
router.put(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePost
)
router.delete(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)

module.exports = router
