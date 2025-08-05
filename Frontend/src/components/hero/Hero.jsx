import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import "./Hero.css";
import '../Media.css'


import cross from "../assets/cross-checkbox-svgrepo-com.svg";
import edit from "../assets/edit-fill-1480-svgrepo-com.svg";

import {
  creatNewNote,
  deleteNotes,
  getNotes,
  updateNotes,
} from "../Services/Axios";
import toast from "react-hot-toast";


const Hero = () => {
  const successToastStyling = {
    className: "toast-style-success",
    icon: "",
  };

  const errorToastStyling = {
    className: "toast-style-error",
    icon: "",
  };

/// Second array

const [allNotes,setAllNotes] = useState([])

/// Input state declaration

const [searchTerm,setSearchTerm] = useState('')
  

  /// Initial Notes State
  const [notes, setNotes] = useState([]);

  /// Sidebar Notes

  const [sidebarArr,setSidebarArr] = useState([])

  /// Fetched function for useffect hook to not render 2 times
  const fetched = useRef(false);

  /// Form Handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  /// Form subbmiting and creating new Note!

  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userdata"));

      const newN = {
        title: data.title,
        content: data.content,
        color: data.color || "red",
        id: Date.now(),
        isEditable: false,
        createdBy: userId?.id,
      };

      const response = await creatNewNote(newN);

      const result = response.data;

      console.log("this is result", result);

      if (result && result.newNote) {
        setNotes((note) => [...note, result.newNote]);

        setAllNotes((note)=>[ ...note, result.newNote])  

        

        setSidebarArr((note)=> [...note, result.newNote])     

        toast.success(`Added Succesfully`, successToastStyling);

        reset();

       
      }

      setToggle(false);
    } catch (error) {
      console.log(error);
      toast.error("Failded to create Note", errorToastStyling);
    }

    // Close form after submission
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const Uid = JSON.parse(localStorage.getItem("userdata"));

        console.log(Uid.id, "this is userid");

        const allNotes = await getNotes(Uid.id);

        const result = allNotes.data;

        console.log(result.getnote);

        if (result && result.getnote) {
          const notesWithFlag = result.getnote.map((note) => ({
            ...note,
            isEditable: false,
          }));

          setNotes((prevNotes) => [...prevNotes, ...notesWithFlag]);
          setSidebarArr((prevNotes)=> [...prevNotes,...notesWithFlag])
          setAllNotes((prevNotes)=> [...prevNotes,...notesWithFlag])

          

        
          


         



        } else {
          console.log("result is not an array this is ", typeof [result]);
        }
      } catch (error) {
        console.log("backend error", error.response.data.message);
      }
    };

    if (!fetched.current) {
      fetchNotes();
      fetched.current = true;
    }
  }, []);

  const [togglev, setToggle] = useState(false);

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    if (togglev === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  // Delete Note by its ID

  async function handleDelete(noteId) {
    try {
      console.log(noteId);

      const response = await deleteNotes(noteId);

      console.log(response.data.message);

      toast.success("Note Deleted ", successToastStyling);

      setNotes((notes) => notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function handleEditToggle(id) {
    setNotes((notes) =>
      notes.map((n) => (n._id === id ? { ...n, isEditable: !n.isEditable } : n))
    );
  }

  const saveEditedNote = async (id) => {
    const editedNote = notes.find((n) => n._id === id);

    try {
      const response = await updateNotes(id, {
        title: editedNote.title,
        content: editedNote.content,
      });

      const result = response.data;

      console.log("This is message", result.message);

      setNotes((notes) =>
        notes.map((n) =>
          n._id === id ? { ...n, isEditable: !n.isEditable } : n
        )
      );

      toast.success("Note Updated", successToastStyling);
    } catch (error) {
      console.log("Failed to update the note", error.response?.data);
    }
  };



  const handleNoteNavigation = (id)=> {

    const searchedNote = allNotes.filter((note)=>(
      note._id === id
    ))

    setNotes(searchedNote)

   
  }


  const resetNavigation = ()=>{

     setNotes(allNotes)
    
  }


  const handleSearch = (str)=>{
    setSearchTerm(str)
    if (str.trim() === '') {
      return setNotes(allNotes)
    }

    const filteredNotes = allNotes.filter((note)=>{
     return note.title.toLowerCase().includes(str.toLowerCase()) || note.content.toLowerCase().includes(str.toLowerCase())
      
    })

     setNotes(filteredNotes)

   
  }




  return (
    <div>
      <Navbar />

      <div className="herof">
        <div
          className={togglev ? "plus active" : "plus"}
          onClick={handleToggle}
        >
         <i className="fa-solid fa-plus"></i>
        </div>

      



        {/* /// THIS IS THS SICE-BAR BOX WHERE THE TITLE OF TODO'S WILL APPEAR */}
        <div className="notes-description-box">
          <h4 onClick={resetNavigation} > Show All</h4>

          <div className="notes-with-title">
             {
            
            notes.map((note)=>{
              return <div className="desbox" key={note._id} onClick={()=>handleNoteNavigation(note._id)} >

                <h5>{note.title}</h5>



              </div>
            })
            
            } 
            </div>
        </div>





        {/* /// IN THIS CONTAINER ALL THE NOTES WILL RENDER FROM THE BACKEND /// */}

        
        <div className="notes-box">

        {/* // SEARCH BAR  */}

        <input type="text"
         className="search-bar" 
         placeholder="Search Notes..."  
         value={searchTerm}  
         onChange={(e)=> handleSearch(e.target.value)}
         />



            



          {notes.map((newNote) => {
            return (
              <div
                className="box"
                key={newNote._id || newNote.id}
                style={{ background: newNote.color }}
              >
                <textarea
                  name="title"
                  value={newNote.title}
                  readOnly={!newNote.isEditable}
                  id="first"
                  onChange={(e) =>
                    setNotes((notes) =>
                      notes.map((note) =>
                        note._id === newNote._id
                          ? { ...note, title: e.target.value }
                          : note
                      )
                    )
                  }
                ></textarea>
                <textarea
                  name="content"
                  value={newNote.content}
                  readOnly={!newNote.isEditable}
                  id="second"
                  onChange={(e) =>
                    setNotes((notes) =>
                      notes.map((note) =>
                        note._id === newNote._id
                          ? { ...note, content: e.target.value }
                          : note
                      )
                    )
                  }
                ></textarea>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(newNote._id)}
                >
                  <img src={cross} alt="Delete button" />
                </button>
                <button
                  className={
                    newNote.isEditable ? "edit-btn active" : "edit-btn"
                  }
                  onClick={() => handleEditToggle(newNote._id)}
                >
                  <img src={edit} alt="Edit button" />
                </button>
                <div
                  className={
                    newNote.isEditable ? "save-btn active" : "save-btn"
                  }
                  onClick={() => saveEditedNote(newNote._id)}
                >
                  Save Changes
                </div>
              </div>
            );
          })}
        </div>
        <div className={togglev ? "create-note active" : "create-note"}>
          <div className="create-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="Title......"
                name="first"
                id="first"
                {...register("title", { required: true, minLength: 1 })}
                className={errors.title ? "title-error" : ""}
              >
                {""}
              </textarea>
              <textarea
                name="second"
                id="second"
                placeholder="Content...."
                {...register("content", { required: true, minLength: 1 })}
                className={errors.content ? "content-error" : ""}
              ></textarea>
              <div className="choose-colors">
                <input
                  type="radio"
                  className="first"
                  name="color"
                  {...register("color")}
                  defaultValue="rgb(224, 82, 82)"
                />
                <label htmlFor="red"></label>
                <input
                  type="radio"
                  className="second"
                  name="color"
                  {...register("color")}
                  defaultValue="rgb(69, 161, 236)"
                />
                <label htmlFor="blue"></label>
                <input
                  type="radio"
                  className="third"
                  name="color"
                  {...register("color")}
                  defaultValue="rgb(66, 214, 170)"
                />
                <label htmlFor="green"></label>
                <input
                  type="radio"
                  className="fourth"
                  name="color"
                  {...register("color")}
                  defaultValue="linear-gradient(rgb(235, 224, 131),rgb(224, 143, 77))"
                />
                <label htmlFor="gradient1"></label>
                <input
                  type="radio"
                  className="fifth"
                  name="color"
                  {...register("color")}
                  defaultValue="linear-gradient(rgb(206, 58, 107),rgb(219, 48, 119))"
                />
                <label htmlFor="gradient2"></label>
                <input
                  type="radio"
                  className="sixth"
                  name="color"
                  {...register("color")}
                  defaultValue=" linear-gradient(rgb(140, 82, 212),rgb(179, 143, 223))"
                />
                <label htmlFor="gradient3"></label>
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
