import express from "express"

import {getAllNote, createNotes, updateNotes, deleteNotes, getNoteById } from "../notesControllers/notesControllers.js"
import rateLimiter from "../../middilware/RateLimiter.js"
const router=express.Router()
router.get('/',rateLimiter,getAllNote) 
router.get('/:id',getNoteById) 
router.post('/',createNotes) 
router.put('/:id',updateNotes) 
router.delete('/:id',deleteNotes) 

export default router