import React, {Component} from "react";

export default class File extends Component {

    constructor(prop) {
        super(prop);

        this.state = {
            isActive: false
        };
    }

    active() {
        this.setState({
            isActive: true
        });
    }

    componentDidMount() {
        this.refs.view.classList.add("fade-in");
    }

    componentWillUnmount() {
        this.refs.view.classList.add("fade-out");
    }

    get path() {
        return this.props.file.path;
    }

    render() {
        let initStyle = {
            opacity: 0
        };
        return (
            <li ref="view" style={initStyle} className={this.state.isActive ? "active" : ""}>{this.props.file.name}</li>
        );
    }
}