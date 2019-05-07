import  React, {  Component } from 'react';
import {State} from './state';
import {Props} from './props';

export default class App extends Component<Props> {
  public static defaultProps = {
    userName: "John",
    imageUrl: "https://picsum.photos/50/50" 
  };
state: State = {userName: this.props.userName,
  imageUrl: this.props.imageUrl};

  styles = {margin: 40};

  handleClick = () => {
    this.setState({userName: "Mary"});
  }
  render() {
    return (
      <div style={this.styles}>
         {this.props.children}
        <h1>{this.state.userName}</h1>
        <button onClick={this.handleClick}>CHANGE TO MARY</button><br/>
        <img src={this.state.imageUrl}/>
      </div>
    );
  }
}
