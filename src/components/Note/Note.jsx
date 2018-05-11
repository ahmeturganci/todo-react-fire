import React, {Component} from 'react'

import PropTypes from 'prop-types';

const styles = {
    giveMargin: {
        margin: "auto",
        width:"85%"
    },
    headerTitle:{
        color:"#bb253b"
    }
};

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteTitle = props.noteTitle;
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;


    }

    handleRemoveNote(id) {

        this.props.removeNote(id);
    }

    render() {
        return (
            <div className="pt-card pt-elevation-0 pt-interactive "
                 style={styles.giveMargin}
            >
                <h5><a href="#" onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this note?')) {
                        this.handleRemoveNote(this.noteId)
                    }
                }} style={styles.headerTitle}>{this.props.noteTitle}</a></h5>
                <p> {this.props.noteContent}</p>

            </div>


        )
    }
}

Note.propTypes = {

    noteTitle: PropTypes.string,
    noteContent: PropTypes.string
}
export default Note;