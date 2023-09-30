import express from 'express'

const router = express()


/*------------------------------------------------ for Admin routes ----------------------------------------------*/
import adminRouter from './adminRoutes.mjs'
router.use('/admin', adminRouter)

/*------------------------------------------------ for property routes ----------------------------------------------*/
import propertyRouter from './propertyRoutes.mjs'
router.use('/property', propertyRouter)


/*------------------------------------------------ For rental routes ----------------------------------------------*/
import rentalRouter from './rentalRoutes.mjs'
router.use('/rental', rentalRouter)

export default router