// import * as React from 'react';
// import styles from './Tables.module.scss';
// export default (class Tables extends React.PureComponent {
// 	state = {};
// 	componentDidMount() {}
// 	render() {
// 		return <div className={styles.main}>Tablas</div>;
// 	}
// });
import * as React from 'react';
import styles from './Tablas.module.scss';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';
import cashoutData from '../../resources/jsons/cashoutData.json';
import CurrencyFormat from 'react-currency-format';
import { IconTable, IconChart } from '../../resources/svg/Icons';
import produce from 'immer/dist/immer';
import SimpleBarChart from '../Chart/Chart';
import BiaxialChart from '../Chart/BiaxialChart';
import PieChartUsable from '../Chart/PieChart';

import Table from '../../components/Table/Table';
export default (class Tablas extends React.PureComponent {
    state = {
        selected: {
            table: true,
            chart: false
        },
        data:[]
    };

    componentDidMount() { 

        this.init();
    }

    init = () => {
        let array = [];
        cashoutData[0].summary.forEach((item, i) => {
            const element = {
                name: item.zone,
                value: item.sold,
            };
            array = array.concat(element);
        });
        const nextState = produce(this.state, (draft) => {
            draft.data = array;
        });
        this.setState(nextState);
    };
    
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
    onHandleIcon = (item) => {
        const nextState = produce(this.state, (draft) => {
            draft.selected.table = false;
            draft.selected.chart = false;
            draft.selected[item] = true;
        });
        this.setState(nextState);
    };

    calculateFooter = (data, item) => {
        switch (item.footer) {
            case 'sum':
                return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
            default:
                return item.footer;
        }
    };

    render() {
        const headers = cashoutHeader;
        const data = cashoutData[0];
        console.log("TCL: Tablas -> render -> data", data)
        const { selected } = this.state;
        return (
            <div className={styles.table_container}> 

                <div className={styles.icons}>
                    <div className={styles.container_icon} onClick={() => this.onHandleIcon('table')}>
                        <IconTable className={selected.table ? styles.icon_selected : styles.icon} />
                    </div>
                    <div className={styles.container_icon} onClick={() => this.onHandleIcon('chart')}>
                        <IconChart className={selected.chart ? styles.icon_selected : styles.icon} />
                    </div>
                </div>

                {selected.table && (
                    <Table headers={headers} data={data} caption={data.name}></Table>
                )}
                { selected.chart && (
                    <div>
                        <div className={styles.graficas}>
                            <SimpleBarChart newData={data.summary} label={"zone"} llaves={["sold", "total"]} fill={["rgba(200,0,0,.3)", "rgba(0, 200, 0, .3)"]} />
                        </div>
                        <div>
                            <BiaxialChart newData={data.summary} label={"zone"} llaves={['sold','total']} fill={["rgba(0,200,0,.3)",""]} />
                        </div>
                        <div>
                            <PieChartUsable data={this.state.data} label={"zone"} llaves={['sold','total']} fill={["rgba(0,200,0,.3)",""]} />
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
});

