import React, { Component } from "react";
import { State } from "./state";

export default class App2 extends Component {
  state: State = {
    userName: "",
    imageUrl: "https://picsum.photos/600/300"
  };

  styles = { margin: 40 };

  onSubmit(event: any){
      event.preventDefault();
  }

  render() {
    return (
      <div style={this.styles}>
        <form style={{ marginBottom: 20 }}>
            <input type="text" placeholder="Enter your name"/>
            <button type="submit">Greet me</button>
        </form>
        <span>{this.sayHello(this.state.userName)}</span>
        <img src={this.state.imageUrl} />
      </div>
    );
  }

  sayHello(name: string): string {
    return this.state.userName === "" ?
                                   "" :
                                  `Hello ${this.state.userName}`; 
  }
}

