import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { IconAddMark, IconRemoveMark } from '../../resources/svg/Icons';

export default class Button extends React.Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		label: PropTypes.string
	};
	selection = (type) => {
		switch (type){
			case 'add':
				return <IconAddMark className={styles.icon} />;

			default:
				return <IconAddMark className={styles.icon} />;
		}
	};
	render() {
		const { onClick, type, className } = this.props;
		console.log('TCL: Button -> render -> className', className);
		return (
			<div className={styles.main}>
				<button onClick={onClick} className={styles.button + ' ' + className}>
					{this.seletIcon(type)}
				</button>
			</div>
		);
	}
}
