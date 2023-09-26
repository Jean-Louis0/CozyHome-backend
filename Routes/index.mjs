import express from 'express'

const router = express()


/*------------------------------------------------ for Admin routes ----------------------------------------------*/
import adminRoutes from './adminRoutes.mjs'
router.use('/admin', adminRoutes)

export default router