import React, {Component} from 'react';
import logo from '../logo.png'

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: false,
            className:'menu'
        };

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if(this.state.isActive){
            this.setState({'className': 'menu', 'isActive':false});
        }else {
            this.setState({'className': 'menu-active', 'isActive':true});
        }
    }

    render() {
        return(
            <div className={this.state.className} onClick={this.handleClick}>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">hi from texx react</h1>
            </div>
        )
    }
}













