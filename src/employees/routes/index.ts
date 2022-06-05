import { Router } from 'express'
import { EmployeeController } from '../controller'


export default (controller: EmployeeController): Router => {
    const router = Router()

    router.get('/', controller.getEmployeeAll)
    router.post('/', controller.addEmployee)
    router.get('/:id', controller.getEmployee)
    router.put('/:id', controller.updateData)
    router.delete('/:id', controller.delEmployee)
    return router
}

