import { Component } from "react";
import React from "react";
import './Myriorama.css';
import imageLoader from './images';
import image from './assets/myriorama1/Frame01.gif';
import { Card, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

class Myriorama extends Component {

    constructor(props) {
        super(props);

        this.drone = this.props.drone;
        this.myriorama = React.createRef();

        this.state = {
            id: 0,
            isLeader: false,
            myIndex: -1,
            members: [],
            fadeIn: {},
        }

        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const id = this.drone.clientId;
            this.setState({ id });
        });

        this.room = this.drone.subscribe("observable-room");
        this.room.on('message', message => {
            this.setState({ myIndex: message.data.indices[this.state.id] });
            /* this.setState({
                fadeIn: {
                    animation: 'x 1s',
                    animationName: Radium.keyframes(fadeIn, "fadeIn"),
                }
            }) */
        });

        this.room.on('members', members => {
            if (members.length === 1) {
                this.setState({ isLeader: true });
            }
            this.setState({ members });
        })

        this.room.on("member_join", member => {
            let temp = this.state.members;
            temp.push(member);
            this.setState({ members: temp });
        })

        this.room.on("member_leave", member => {
            let temp = this.state.members;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === member.id) {
                    temp.splice(i, 1);
                }
            }
            this.setState({ members: temp });
        })

        // Bind functions
        this.initMyriorama = this.initMyriorama.bind(this);
        this.getImageURL = this.getImageURL.bind(this);
    }

    componentDidMount() {
        console.log(this.refs);
    }

    initMyriorama() {
        let indices = {};
        console.log(this.state.members);
        for (let i = 0; i < this.state.members.length; i++) {
            let index = Math.floor(Math.random() * 12) + 1;
            while (Object.values(indices).indexOf(index) > -1) {
                index = Math.floor(Math.random() * 12) + 1;
            }
            indices[this.state.members[i].id] = index;
        }
        this.drone.publish({
            room: "observable-room",
            message: { indices }
        })
    }

    getImageURL() {
        if (this.state.myIndex < 10) {
            //return image;
            return require("./assets/myriorama1/Frame0" + this.state.myIndex + ".gif");
        } else {
            return require("./assets/myriorama1/Frame" + this.state.myIndex + ".gif");
        }
    }

    render() {

        return (
            <>
                {this.state.myIndex > -1 ?
                    <CSSTransition
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}
                    >
                        <img
                            src={this.getImageURL()}
                            alt={this.state.myIndex}
                            width="100%"
                            onClick={() => this.initMyriorama()}
                        />
                    </CSSTransition>
                    :
                    <div className="MyrioramaControl">
                        Your Client ID: {this.state.id}<br />
                        {this.state.isLeader ?
                            <Button onClick={this.initMyriorama}>
                                Initiate the Myriorama
                        </Button> : ""}
                        <br />
                        My Index: {this.state.myIndex}<br />
                    </div>}
            </>
        );
    }
}

export default Myriorama;