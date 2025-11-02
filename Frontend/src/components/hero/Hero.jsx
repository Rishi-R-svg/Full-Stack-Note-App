import React, { useEffect, useRef, useState, useMemo } from "react";
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

  // Single source of truth for all notes
  const [allNotes, setAllNotes] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  
  const [togglev, setToggle] = useState(false);
  const fetched = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  // Memoized filtered notes - only recalculates when dependencies change
  const displayedNotes = useMemo(() => {
    let filtered = allNotes;

    // Filter by selected note
    if (selectedNoteId) {
      filtered = filtered.filter(note => note._id === selectedNoteId);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [allNotes, searchTerm, selectedNoteId]);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const Uid = JSON.parse(localStorage.getItem("userdata"));
        const response = await getNotes(Uid.id);
        const result = response.data;

        if (result?.getnote) {
          // Single state update with mapped data
          const notesWithFlag = result.getnote.map((note) => ({
            ...note,
            isEditable: false,
          }));
          
          setAllNotes(notesWithFlag);
        }
      } catch (error) {
        console.log("backend error", error.response?.data?.message);
        toast.error("Failed to load notes", errorToastStyling);
      }
    };

    if (!fetched.current) {
      fetchNotes();
      fetched.current = true;
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userdata"));

      const newN = {
        title: data.title,
        content: data.content,
        color: data.color || "rgb(224, 82, 82)",
        id: Date.now(),
        isEditable: false,
        createdBy: userId?.id,
      };

      const response = await creatNewNote(newN);
      const result = response.data;

      if (result?.newNote) {
        // Single state update
        setAllNotes(prev => [...prev, result.newNote]);
        toast.success(`Added Successfully`, successToastStyling);
        reset();
      }

      setToggle(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create Note", errorToastStyling);
    }
  };

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    setToggle(prev => !prev);
  }

  async function handleDelete(noteId) {
    try {
      await deleteNotes(noteId);
      toast.success("Note Deleted", successToastStyling);
      
      // Single state update
      setAllNotes(notes => notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error("Failed to delete note", errorToastStyling);
    }
  }

  function handleEditToggle(id) {
    setAllNotes(notes =>
      notes.map(n => (n._id === id ? { ...n, isEditable: !n.isEditable } : n))
    );
  }

  const saveEditedNote = async (id) => {
    const editedNote = allNotes.find(n => n._id === id);

    try {
      await updateNotes(id, {
        title: editedNote.title,
        content: editedNote.content,
      });

      setAllNotes(notes =>
        notes.map(n =>
          n._id === id ? { ...n, isEditable: false } : n
        )
      );

      toast.success("Note Updated", successToastStyling);
    } catch (error) {
      console.log("Failed to update the note", error.response?.data);
      toast.error("Failed to update note", errorToastStyling);
    }
  };

  const handleNoteNavigation = (id) => {
    setSelectedNoteId(id);
    setSearchTerm(''); // Clear search when navigating to specific note
  };

  const resetNavigation = () => {
    setSelectedNoteId(null);
    setSearchTerm('');
  };

  const handleSearch = (str) => {
    setSearchTerm(str);
    setSelectedNoteId(null); // Clear note selection when searching
  };

  const updateNoteField = (noteId, field, value) => {
    setAllNotes(notes =>
      notes.map(note =>
        note._id === noteId ? { ...note, [field]: value } : note
      )
    );
  };

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

        {/* Sidebar with all notes */}
        <div className="notes-description-box">
          <h4 onClick={resetNavigation}>Show All</h4>

          <div className="notes-with-title">
            {allNotes.map((note) => (
              <div
                className="desbox"
                key={note._id}
                onClick={() => handleNoteNavigation(note._id)}
              >
                <h5>{note.title}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* Main notes display */}
        <div className="notes-box">
          {/* Search bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search Notes..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Display filtered notes */}
          {displayedNotes.map((newNote) => (
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
                onChange={(e) => updateNoteField(newNote._id, 'title', e.target.value)}
              />
              <textarea
                name="content"
                value={newNote.content}
                readOnly={!newNote.isEditable}
                id="second"
                onChange={(e) => updateNoteField(newNote._id, 'content', e.target.value)}
              />
              <button
                className="delete-btn"
                onClick={() => handleDelete(newNote._id)}
              >
                <img src={cross} alt="Delete button" />
              </button>
              <button
                className={newNote.isEditable ? "edit-btn active" : "edit-btn"}
                onClick={() => handleEditToggle(newNote._id)}
              >
                <img src={edit} alt="Edit button" />
              </button>
              <div
                className={newNote.isEditable ? "save-btn active" : "save-btn"}
                onClick={() => saveEditedNote(newNote._id)}
              >
                Save Changes
              </div>
            </div>
          ))}
        </div>

        {/* Create note form */}
        <div className={togglev ? "create-note active" : "create-note"}>
          <div className="create-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="Title......"
                name="first"
                id="first"
                {...register("title", { required: true, minLength: 1 })}
                className={errors.title ? "title-error" : ""}
              />
              <textarea
                name="second"
                id="second"
                placeholder="Content...."
                {...register("content", { required: true, minLength: 1 })}
                className={errors.content ? "content-error" : ""}
              />
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
                  defaultValue="linear-gradient(rgb(140, 82, 212),rgb(179, 143, 223))"
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