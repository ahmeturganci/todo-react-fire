import React, {Component} from 'react'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textLogo: "React & FireBase ToDo App",
            githuburi: "http://www.github.com/ahmeturganci/todo-react-fire",
            mediumuri: "http://medium.com/@ahmeturganci",
            searchText:""
        }

    }


    render() {
        var self = this;

        return (

            <nav className="pt-navbar pt-dark">
                <div>
                    <div className="pt-navbar-group pt-align-left">
                        <div className="pt-navbar-heading">{self.state.textLogo}</div>
                        <input className="pt-input" placeholder="Search Note" type="text"
                        value={this.state.searchText}
                        onChange={(event)=>self.setState({searchText:event.target.value})}
                        />
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <a className="pt-button pt-minimal pt-icon-git-repo"
                           href={self.state.githuburi}
                           target="_blank"
                        >Github</a>
                        <span className="pt-navbar-divider"></span>
                        <a className="pt-button pt-minimal pt-icon-document"
                           href={self.state.mediumuri}
                           target="_blank">Medium
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;