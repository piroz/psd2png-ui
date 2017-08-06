import React, {Component} from "react";
import File from "./file";
import "./droparea.scss";
const fs = require("fs-extra");

export default class DropArea extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            files: [],
            index: 0
        };

        this.onDragOver = (ev) => {
            ev.preventDefault();
        };

        this.onDrop = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            this.enqueue(ev.dataTransfer.files);

            this.extract();
        };

        this.timer = setInterval(() => {
            this.dequeue();
        }, 1000);
    }

    enqueue(filelist) {
        let tmp = [];

        console.dir(filelist);

        for (let i = 0, m = filelist.length; i < m; i++) {

            if (!fs.statSync(filelist[i].path).isDirectory()) {
                continue;
            }

            console.log(filelist[i].path);
/*
            if (filelist[i].name.match(/psd$/) === null) {
                continue;
            }
            tmp.push(<File key={this.state.index} file={filelist[i]}/>);
            this.setState({
                index: this.state.index + 1
            });*/
        }

        this.setState({
            files: this.state.files.concat(tmp)
        });
    }

    dequeue() {
        let file = this.state.files.shift();
        console.dir(file);
        this.setState({
            files: this.state.files
        });
    }

    render() {
        return (
            <div className="drop-area-wrap">
                <div className="drop-area" onDragOver={this.onDragOver} onDrop={this.onDrop}></div>
                <ul className="files">
                    {this.state.files}
                </ul>
            </div>
        );
    }
}