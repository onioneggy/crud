import {Router} from 'express'
import { getEmployeeAll, getEmployee, addEmployee, newData, delEmployee } from '../controller/controller'


const router = Router()

router.get('/', getEmployeeAll)
router.post('/', addEmployee)
router.get('/:id', getEmployee)
router.put('/:id', newData)
router.delete('/:id', delEmployee)

export default router
