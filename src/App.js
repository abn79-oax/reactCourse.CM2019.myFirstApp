import React from 'react';
import styles from './App.module.scss';
import List from './components/List/List';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Board from './Board/Board';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		family: {
			items: [ 'Walter', 'Rocio', 'Mia', 'Walter Jr' ],
			index: 0,
			input:{
				add:'',
				remove:''
			}
		},
		sports: {
			items: [ 'Futbol', 'Beisbol', 'Basquetbol', 'Golf','Box' ],
			index: 0,
			input:{
				add:'',
				remove:''
			}
    	},
    	food: {
			items: [ 'Quesillo', 'Mole Negro', 'Barbacoa' ],
			index: 0,
			input:{
				add:'',
				remove:''
			}
    	},
    	drink: {
			items: [ 'Tejate', 'Mezcal'],
			index: 0,
			input:{
				add:'',
				remove:''
			}
    	},
    	city: {
			items: [ 'Oaxaca', 'CDMX', 'Guadalajara', 'Monterrey' ],
			index: 0,
			input:{
				add:'',
				remove:''
			}
		}
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
			draft[property].items = draft[property].items.concat(draft[property].input.add);
			console.log('TCL: App -> nextState -> draft.family.items', draft.family.items);
			draft[property].input.add='';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index,property) => {
		const nextState = produce (this.state,(draft)=>{
			draft[property].items.splice(index,1);
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (property) => {
		const nextState = produce(this.state,(draft) =>{
			draft[property].items.splice(draft[property].input.remove - 1,1);
		});
	};

	onAddInputChange = (event,property) => {
		const value = event.target.value;
		const nextState = produce(this.state,(draft)=>{
			draft[property].input.add=value;
		});
		this.setState(nextState);
	};

	onInputChange = (event) => {
		const value = event.target.value;
		console.log('TCL: App -> onInputChange -> value', value);
		const nextState = produce(this.state, (draft) => {
			draft.input = value;
		});
		this.setState(nextState);
	};

	render() {
		const { family, sports, food, drink,city} = this.state;
		return (
			<div>
				<p className={styles.title}>¡Bienvenidos al curso de programación de cómputo móvil!</p>
				
				<div className={styles.container_boards}>
					<div className={styles.container_add}>
						<Input value={family.input} onChange={this.onInputChange} />
						<Button label={'Agregar'} onClick={this.onAddButtonClick} />
						<Board items={family.items} index={family.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('family')} />
					</div>
					<div className={styles.container_add}>
						<Input value={sports.input} onChange={this.onInputChange} />
						<Button label={'Agregar'} onClick={this.onAddButtonClick} />
						<Board items={sports.items} index={sports.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('sports')} />
					</div>
					<Board items={food.items} index={food.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('sports')} />
					<Board items={drink.items} index={drink.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('sports')} />
					<Board items={city.items} index={city.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('sports')} />
				</div>
        {/* <p className={styles.result}>El nombre seleccionado es: {items[index]}</p> */
          <p className={styles.result}>
            El resultado es: <br></br>
            <label>{family.items[family.index]}</label><br></br>
            <label>{sports.items[sports.index]}</label><br></br>
            <label>{food.items[food.index]}</label><br></br>
            <label>{drink.items[drink.index]}</label><br></br>
            <label>{city.items[city.index]}</label>
          </p> 
        }
			</div>
		);
	}
}

export default App;
