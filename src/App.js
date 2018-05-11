import React, {Component} from 'react';
import Note from './components/Note/Note';
import NoteForm from './components/NoteForm/NodeForm';

import {DB_CONFIG} from './Config/Config';
import firebase from 'firebase/app';
import 'firebase/database';

import Header from "./components/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);

        this.app = firebase.initializeApp(DB_CONFIG);//start a firebase application
        this.database = this.app.database().ref().child('notes');//Database 

        this.state = {
            notes: [],
        };
        //function binding operation
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);

    }

    componentWillMount() {
        const previousNotes = this.state.notes;
        //add new note
        this.database.on('child_added', snap => {
            previousNotes.push({
                id: snap.key,
                noteTitle: snap.val().noteTitle,
                noteContent: snap.val().noteContent,
            })
            //added after notes list refresh
            this.setState({
                notes: previousNotes
            })
        })

        //delete note
        this.database.on('child_removed', snap => {
            //basic logic find field id in firabase
            for (var i = 0; i < previousNotes.length; i++) {
                if (previousNotes[i].id === snap.key) {
                    previousNotes.splice(i, 1);
                }
            }
            this.setState({
                notes: previousNotes
            })
        })
    }

    addNote(note) {
        this.database.push().set({noteTitle: note.noteTitle, noteContent: note.noteContent});
    }

    removeNote(noteId) {
        this.database.child(noteId).remove();
    }

    render() {
        return (
            <div className="notesWrapper">
                <Header/>
                <NoteForm addNote={this.addNote}/>
                <div className="notesBody" >
                    {
                        this.state.notes.map((note) => {
                            return (
                                <Note noteContent={note.noteContent}
                                      noteTitle={note.noteTitle}
                                      noteId={note.id}
                                      key={note.id}
                                      removeNote={this.removeNote}/>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}

export default App;