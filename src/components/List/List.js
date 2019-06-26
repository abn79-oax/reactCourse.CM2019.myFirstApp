import * as React from 'react';
import styles from './List.module.scss';
import {IconXMark} from '../../resources/svg/Icons';

class List extends React.Component {
	state = {
		items: ["Perro","Gato","Elefante","Pato","Cerdo"],
		name: '',
		index: 0,
		object: {}
	};

	componentDidMount() {}

	render() {
		const { items, index } = this.props;
		return (
			<div className={styles.main}>
				<ul className={styles.list}>
					{items.map((item, i) => (
						<li key={i} className={index === i ? styles.item_selected:styles.item}>
							<p className={styles.item_name}>{item}</p>
							<div onClick={() => this.onConsole(i)}>
								<IconXMark className={styles.icon}/>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default List;