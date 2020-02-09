import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Alert, DropdownToggle, DropdownMenu, DropdownItem, Media} from 'reactstrap';
import {ButtonDropdown} from "reactstrap";
import DensityComponent from './DensityComponent';
import StudyHuskyLogo from './StudyHuskyLogo.jpg';


class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      occupied: false,
      leftRoom: false,
      room: 'Select room'
    }
    


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleLeaveClick = this.handleLeaveClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state.id);
    });
  }

  handleSubmit(e) {
    this.setState({ occupied: true}, () => {
      console.log(this.state.room + ' ' + this.state.id);
    });
    //this.props.onLocChange(this.state.room);
    this.props.submitAdd(e);
    e.preventDefault();
  }

  handleLeaveClick(e) {
      this.props.submitSub(e);
      this.setState({ leftRoom: true}, ()=> {
          console.log(this.state.leftRoom);
      })
  }

  handleRoomChange(roomVal) {
    // const promise = this.setState({ room: roomVal});
    // const promise2 = promise.then(this.props.populate(), console.log('fail'));
    this.setState({ room: roomVal }, () => {
      this.props.onLocChange(this.state.room);
    });
    // this.props.populate();
  }

  render() {
    return (
      <div id="div-banner" >
           {/* <Media id="media">
              <Media left href="#">
                <Media object src={StudyHuskyLogo.jpg}  alt="Husky Logo" />
              </Media>
              <Media body>
                <Media heading >
                    StudyHusky
                </Media>
                </Media>
          </Media> */}
        <div>
          {/* <img src= {logo} />  */}
            <h2 id="div-kudos">Nice job! You now have {this.props.kudos} kudos!</h2>
        </div>
        <div>
            <img id="huskyimg" src={StudyHuskyLogo} />
            <h1 id="div-logo">StudyHusky</h1>
        </div>
        <div id="div-form">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type="text" name="id" placeholder="NUID" onChange={(this.handleChange)}/>
                </FormGroup>
                {!this.state.occupied && <DropdownComponent2 onRoomChange={this.handleRoomChange} roomNumber={this.state.room}/>}
                {this.state.occupied && <Alert color="success">You've joined this room!</Alert>}
                {this.state.leftRoom && <Alert color="danger">You've left this room!</Alert>}
                {!this.state.occupied && !this.state.leftRoom && <Button type="submit" color="success">Join this room</Button>}
                {this.state.occupied && !this.state.leftRoom && <Button color="danger" onClick = {this.handleLeaveClick}>Leave this room</Button>}
            </Form>
        </div>
        <div id="div-density1">
            <DensityComponent roomName="SN11" cur={this.props.sn11[0]} max={this.props.sn11[1]} occupancy={this.props.sn11[0] / this.props.sn11[1]}/>
        </div>
        <div id="div-density2">
            <DensityComponent roomName="SN12" cur={this.props.sn12[0]} max={this.props.sn12[1]} occupancy={this.props.sn12[0] / this.props.sn12[1]}/>
        </div>
        <div id="div-density3">
            <DensityComponent roomName="SN13" cur={this.props.sn13[0]} max={this.props.sn13[1]} occupancy={this.props.sn13[0] / this.props.sn13[1]}/>
        </div>
      </div>

    );
  }
}

class DropdownComponent2 extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropDownValue: 'Select location',
      dropdownOpen: false
    };
  }

  toggle(event) {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.props.onRoomChange(e.currentTarget.textContent);
    // this.setState({dropDownValue: e.currentTarget.textContent}, () => {
    //     console.log(this.state.dropDownValue);
    // });
    // this.setState({dropDownValue: e.currentTarget.textContext}, () => {
    //         this.props.onRoomChange(e.currentTarget.textContent);
    //     })
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
          {this.props.roomNumber}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.changeValue}>SN11</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN12</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN13</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

}

export {ContainerComponent, DropdownComponent2};
