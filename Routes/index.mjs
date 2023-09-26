import express from 'express'

const router = express()


/*------------------------------------------------ for Admin routes ----------------------------------------------*/
import adminRoutes from './adminRoutes.mjs'
router.use('/admin', adminRoutes)

/*------------------------------------------------ for property routes ----------------------------------------------*/
import propertyRoutes from './propertyRoutes.mjs'
router.use('/property', propertyRoutes)

export default router