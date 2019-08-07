import React from 'react';
import styles from './Boards.module.scss';
// import List from './components/List/List';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Board from '../../Board/Board';
import AddBoard from '../../components/AddBoard/AddBoard';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		boards:[
			// {
			// 	title: 'Familia',
			// 	items: [ 'Chuchito', 'Juanita', 'Diego', 'Lucy' ],
			// 	index: 0,
			// 	input:{
			// 		add:'',
			// 		remove:''
			// 	}
			// }
		],
		name:''	

	};

	onHandleButton = (object) => {
		console.log('TCL: App -> onHandleButton -> object', object);
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			draft.boards[property].items = draft.boards[property].items.concat(draft.boards[property].input.add);
			draft.boards[property].input.add='';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index,property) => {
		const nextState = produce (this.state,(draft)=>{
			draft.boards[property].items.splice(index,1);
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (property) => {
		const nextState = produce(this.state,(draft) =>{
			draft.boards[property].items.splice(draft.boards[property].input.remove - 1,1);
		});
	};

	onAddInputChange = (event,property) => {
        console.log("TCL: App -> onAddInputChange -> property", property);
		const value = event.target.value;
		const nextState = produce(this.state,(draft)=>{
			draft.boards[property].input.add=value;
		});
		this.setState(nextState);
	};

	onInputChange = (event,property) => {
		const value = event.target.value;
		console.log('TCL: App -> onInputChange -> value', value);
		const nextState = produce(this.state, (draft) => {
			draft.boards[property].input.add = value;
		});
		this.setState(nextState);
	};

	onRemoveInputChange = (event,property) => {
		const value = event.target.value;
		const nextState = produce (this.state,(draft) => {
			draft.boards[property].input.remove = value;
		});
		this.setState(nextState);
	};

	onAddBoard =()=>{
		// console.log("agregando tablero");
		const nextState = produce (this.state,(draft) => {
			draft.boards=draft.boards.concat({
				title: draft.name,
				items: [ ],
				index: 0,
				input:{
					add:'',
					remove:''
				}
			});
		});
		this.setState(nextState);
		console.log(this.state);
	};
	onInputBoardChange=(event)=>{
		console.log(event.target.value);
		const nextState = produce (this.state,(draft) => {
			draft.name=event.target.value;
		});
		this.setState(nextState);
		
	};
	onDeleteBoard=(index)=>{
		console.log("Eliminar board "+index);
		const nextState = produce (this.state,(draft)=>{
			draft.boards.splice(index,1);
		});
		this.setState(nextState);
	};

	render() {
		const { family, name} = this.state;
		return (
			<div>
				<p className={styles.title}>¡Bienvenidos al curso de programación de cómputo móvil!</p>
				<div>
					<AddBoard 
						onAddBoard={this.onAddBoard}
						onInputBoardChange={this.onInputBoardChange}
						name={name}
					/>
				</div>
				<div className={styles.container_boards}>
					{this.state.boards.map((element,indice)=>
						<Board
							object={element}
							onAddButtonClick={() => this.onAddButtonClick(indice)}
							onRemoveButtonClick={() => this.onRemoveButtonClick(indice)}
							onAddInputChange={(event) => this.onAddInputChange(event,indice)}
							onRemoveItem={(index) => this.onRemoveItem(index,indice)}
							onDeleteBoard={() => this.onDeleteBoard(indice)}
						/>
					)}
					{/* <Board
						object={family}
						onAddButtonClick={() => this.onAddButtonClick('family')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('family')}
						onAddInputChange={(event) => this.onAddInputChange(event,'family')}
						onRemoveItem={(index) => this.onRemoveItem(index,'family')}
					/> */}
					
				</div>
				<div className ={styles.sumary}>
					<ul>
						{/* <li>Familia: {family.items.length}</li>
						<li>Bebidas: {drinks.items.length}</li>
						<li>Amigos: {friends.items.length}</li> */}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
