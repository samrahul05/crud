const express =require('express')
const router = express.Router()
const {PostData,GetData,UpdateData,DeleteData} =require("../Controller/Controller")

router.post('/Post',PostData)
router.get('/Get',GetData)
router.put('/Update/:id',UpdateData)
router.delete('/Delete/:id',DeleteData)

module.exports=router