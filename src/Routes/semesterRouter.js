import SemesterControler from "@/Controler/semester/SemesterControler";
import express from "express";
const router = express.Router()

router.get('/getAll', SemesterControler.getAll);
router.get('/get-semester/:userId/:id', SemesterControler.getSemester);
router.post('/create', SemesterControler.create)
module.exports = router
