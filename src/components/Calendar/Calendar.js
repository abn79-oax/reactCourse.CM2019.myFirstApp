import * as React from 'react';
import styles from './Calendar.module.scss';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import { es } from 'date-fns/esm/locale';
import { format, endOfDay,startOfDay} from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import produce from 'immer/dist/immer';

export default (class Calendario extends React.PureComponent{
    componentDidMount () { }

    onHandleCalendar=(date)=>{
        const {onDateChange}=this.props;
        onDateChange(moment(date).format('YYYY-MM-DD'));
    };

    render(){
        return(
            <div className={styles.main}>
                Fechas
                <div className={styles.datepicker}>
                    <Calendar className={styles.calendario} locale={es} rangeColors={['#3861f6']} onChange={this.onHandleCalendar} />
                </div>
            </div>
        );
    }
});