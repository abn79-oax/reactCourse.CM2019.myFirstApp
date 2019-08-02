import * as React from 'react';
import styles from './Input.module.scss';

export default class Button extends React.Component {
	render() {
		const { value,onChange,type,label,pattern } = this.props;
		return (
			<div className={styles.main}>
				<span>
					{label}
				</span>
				<input type={type} className={styles.default} 
				value={value} 
				onChange={onChange} 
				pattern={pattern}
				/>
			</div>
		);
	}
}
