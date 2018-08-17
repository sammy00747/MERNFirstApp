import React from 'react';
import axios from 'axios';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon } from 'reactstrap';

var updId = undefined;

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			data: []
		};
		this.togleState = this.togleState.bind(this);
		this.getRec = this.getRec.bind(this);
		this.addRec = this.addRec.bind(this);
		this.clrInp = this.clrInp.bind(this);
		this.delrecHandler = this.delrecHandler.bind(this);
		this.edrecHandler = this.edrecHandler.bind(this);
		this.updRec = this.updRec.bind(this);
	}
	clrInp() {
		document.getElementById("Name").value = document.getElementById("Phno").value
		= document.getElementById("Email").value = "";
	}
	getRec() {
		let currComp = this;
		axios.get('/Record')
		.then(function(res){
			currComp.setState({
				data: res.data
			});
		})
		.catch(function(err){
			console.log(err);
		});
	}
	addRec() {
		let currComp = this;
		axios.post('/AddRec',{
			name: document.getElementById("Name").value,
			phno: document.getElementById("Phno").value,
			email: document.getElementById("Email").value
		})
		.then(function(res){
			currComp.setState({
				data: res.data
			});
			currComp.clrInp();
		})
		.catch(function(err){
			console.log(err);
		});
	}
	delrecHandler(id) {
		//console.log(id);
		var Id = id;
		let currComp = this;
		axios.delete('/DelRec/'+Id)
		.then(function(res){
			currComp.setState({
				data: res.data
			});
		})
		.catch(function(err){
			console.log(err);
		});
	}
	edrecHandler(id){
		updId = id;
		axios.get('/EdRec/'+updId)
		.then(function(res){
			document.getElementById("Name").value = res.data.name,
			document.getElementById("Phno").value = res.data.phno,
			document.getElementById("Email").value = res.data.email
		})
		.catch(function(err){
			console.log(err);
		});
	}
	updRec() {
		let currComp = this;
		if(updId == undefined){
			console.log("Update Imp'ble"); return;
		}
		axios.put('/UpdRec/'+updId,{
			name: document.getElementById("Name").value,
			phno: document.getElementById("Phno").value,
			email: document.getElementById("Email").value
		})
		.then(function(res){
			currComp.setState({
				data: res.data
			});
			currComp.clrInp();
		})
		.catch(function(err){
			console.log(err);
		});
		updId = undefined;
	}
	togleState() {
		this.setState({
			modal: !this.state.modal
		});
	}
	componentDidMount() {
		this.getRec();
		this.clrInp();
	}
	Add() {
		document.getElementById("Sum").innerHTML = document.getElementById("no1").value*1 + document.getElementById("no2").value*1;
		this.togleState();
	}
	render() {
		return (
		    <div className="container">
			    <h1>Hello World ReactJS!!!</h1>
			    <Button color="danger" onClick={this.togleState}>Hi There!</Button>
			    <Modal isOpen={this.state.modal} toggle={this.toggle}>
			    	<ModalHeader toggle={this.togleState}>Can you see me??</ModalHeader>
			    	<ModalBody>
			    		<Input type="number" name="no1" id="no1" />
			    		<br />
			    		<InputGroup>
							<InputGroupAddon addonType="prepend">+</InputGroupAddon>
							<Input type="number" name="no2" id="no2" />
						</InputGroup>
			    	</ModalBody>
			    	<ModalFooter>
			    		<Button color="primary" onClick={this.Add.bind(this)}>Do Something</Button>
            			<Button color="secondary" onClick={this.togleState}>Cancel</Button>
			    	</ModalFooter>
			    </Modal>
			    <p id="Sum"></p>
				<Button color="danger" onClick={this.getRec}>CLEAR</Button>
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>PhNo</th>
							<th>Email</th>
							<th>Action</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><Input type="text" name="Name" id="Name" /></td>
							<td><Input type="text" name="Phno" id="Phno" /></td>
							<td><Input type="text" name="Email" id="Email" /></td>
							<td><Button color="primary" onClick={this.addRec}>Add Record</Button></td>
							<td><Button color="info" onClick={this.updRec}>Update Record</Button></td>
						</tr>
						{this.state.data.map((a,i) => <TableRow key={i} data={a} delRec={this.delrecHandler} edRec={this.edrecHandler} />)}
					</tbody>
				</table>
		    </div>
		);
	}
}

class TableRow extends React.Component {
	constructor(props){
		super(props);
		//this.delRec = this.delRec.bind(this);
	}
	render() {
		return (
			<tr>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.phno}</td>
				<td>{this.props.data.email}</td>
				<td><Button color="danger" onClick={() => this.props.delRec(this.props.data._id)}>Remove Rec</Button></td>
				<td><Button color="warning" onClick={() => this.props.edRec(this.props.data._id)}>Edit Rec</Button></td>
			</tr>
		);
	}
}

export default App;