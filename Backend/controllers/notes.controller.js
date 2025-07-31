import { response } from "express";
import { Notes } from "../models/notes.model.js";


const createNote = async(req,res)=>{

try {

const {title, content, color,createdBy} = req.body;

if(!title || !content || !color || !createdBy) {
    return res.status(404).send({
        succes:false,
        message: 'please fill all the fields'
    })
}

const newNote =  new Notes({title,content,color,createdBy})

 await newNote.save();

return res.status(201).send({
    succes:true,
    message: 'new note created successfully',
    newNote
})


} catch (error) {
    res.status(500).send({
        succes:false,
        message:'internal server error'
    })
}


}



const getNotes = async (req, res)=>{
    try {
        const {userId} = req.params
        if (!userId) {
            return res.status(400).send({
                success:false,
                message:'invalid userId'
            })}

            const getnote = await Notes.find({createdBy:userId})

            if (!getnote) {
               return res.status(404).send({
                 success: false,
                 message: 'You have no notes yet'
               }) 
            }

            res.status(200).send({
                success:true,
                message:`here's your saved notes`,
                getnote
            })





    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:'Failed to get Notes'

        })
    }
}




const deleteNotes = async (req,res)=> {
    try {
        const {id} = req.params



        if (!id) {
            return res.status(400).send({
                success:false,
                message:'Invalid ID'
            })

           
            
        }


         const note = await Notes.findByIdAndDelete({ _id:id})

            if (!note) {
                return res.status(404).send({
                    success:false,
                    message:'No todo with this id'
                    
                }) }

                return res.status(200).send({
                    success:true,
                    message:'Deleted Succesfully'
                })




    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes:false,
            message:'Internal server error'
        })
    }
}






const updateNotes = async (req,res)=> {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(404).send({
                success:false,
                message: 'Require object ID'
            })
        }

        const data = req.body

        const todo = await Notes.findByIdAndUpdate(id,{$set:data},{returnOriginal:false})

        res.status(200).send({
            success:true,
            message:'Note Updated',
            todo
        })

        



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Internal server error',
            error
        })
    }
}






export {createNote,getNotes,deleteNotes,updateNotes}