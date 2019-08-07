import * as React from 'react';
import styles from './AddBoard.module.scss';
import { IconAddMark, IconRemoveMark } from '../../resources/svg/Icons';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default class AddBoard extends React.Component {
	render() {
		const { onAddBoard,name,onInputBoardChange } = this.props;
		return (
			<div className={styles.main}>
				<Input type={"text"} className={styles.default} value={name} onChange={onInputBoardChange} />
				<Button className={styles.button} iconOfTheBoton={<IconAddMark/>} onClick={onAddBoard}>
				</Button>
			</div>
		);
	}
}