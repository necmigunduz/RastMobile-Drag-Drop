// API Routes
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import backlog controller and set backlog routes
let backLogController = require('./Controllers/backLogController')
router.route('/backlogs')
    .get(backLogController.index)
    .post(backLogController.new)

router.route('/backlogs/:backlog_id')
    .get(backLogController.view)
    .patch(backLogController.update)
    .put(backLogController.update)
    .delete(backLogController.delete)

// Import designed controller and set designed routes
let designedController = require('./Controllers/designedController')
router.route('/designeds')
    .get(designedController.index)
    .post(designedController.new)

router.route('/designeds/:designed_id')
    .get(designedController.view)
    .patch(designedController.update)
    .put(designedController.update)
    .delete(designedController.delete)

// Import inProgress controller and set inProgress routes
let inProgressController = require('./Controllers/inProgressController')
router.route('/inProgress')
    .get(inProgressController.index)
    .post(inProgressController.new)

router.route('/inProgress/:inProgress_id')
    .get(inProgressController.view)
    .patch(inProgressController.update)
    .put(inProgressController.update)
    .delete(inProgressController.delete)

// Import toDo controller and set toDo routes
let toDoController = require('./Controllers/toDoController')
router.route('/toDo')
    .get(toDoController.index)
    .post(toDoController.new)

router.route('/toDo/:toDo_id')
    .get(toDoController.view)
    .patch(toDoController.update)
    .put(toDoController.update)
    .delete(toDoController.delete)

// Export API routes
module.exports = router;