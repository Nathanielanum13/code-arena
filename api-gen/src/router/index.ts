import express, { Router } from "express";
import createApi from "../controller/createApi";
import healthCheck from "../controller/healthCheck";
import restricted from "../controller/restricted";
const router: Router = express.Router()

router.get('/', healthCheck)
router.post('/create-api', createApi)
router.get('/admin', restricted)

export default router