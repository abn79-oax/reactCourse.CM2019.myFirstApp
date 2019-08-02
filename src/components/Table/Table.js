import * as React from 'react';
import styles from './Table.module.scss';
import CurrencyFormat from 'react-currency-format';


export default (class Table extends React.PureComponent {
	state = {};

	formatData = (data, type) => {
		switch (type) {
			case 'text':
				return data;
			case 'number':
				return data.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
			case 'money':
				return <CurrencyFormat value={data} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
			default:
				return data;
		}
	};

	componentDidMount() { }

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			default:
				return item.footer;
		}
	};

	render() {
		const { headers, data, caption } = this.props;
		return (
			<div className={styles.main}>
				<table className={styles.table}>
					<caption>{caption}</caption>
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						{
							data.summary.map((item, i) => {
								item.quantity =(parseFloat(item["courtesies"]) + parseFloat(item["sold"]) + parseFloat(item["promos"]) );
								return (
									<tr key={i} className={styles.row}>
										{
											headers.map((header, i) => {
											return (
												<td key={i} className={styles.row_item}>
													<span>
														{this.formatData(item[header.value], header.type)}
													</span>
												</td>
											);
										})
										}
									</tr>
								);
							})
						}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, i) => {
								return (
									<td key={i} className={styles.footer_item}>
										<span>
											{this.formatData(this.calculateFooter(data, header), header.type)}
										</span>
									</td>
								);
							})}
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
