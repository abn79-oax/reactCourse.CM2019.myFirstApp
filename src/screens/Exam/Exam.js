import * as React from 'react';
import styles from './Exam.module.scss';
import WebServices from '../../WebServices/WebServices';
import produce from 'immer/dist/immer';
import { aliases } from '../Home/Helper';
import Input from './../../components/Input/Input';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import Table from './../../components/Table/Table';
import Button from './../../components/Button/Button';
import SimpleBartChart from './../Chart/ChartWeaether';

export default (class Home extends React.PureComponent {
	state = {
        response: {},
		option: [ { name: 'By City Name', id: 1 }, { name: 'By City ID', id: 2 }, { name: 'By Coordinates', id: 3 }],
        selectedCity: 'http://api.openweathermap.org/data/2.5/weather/?id=3517285&APPID=f4b7aed55eedf34fc3e857d2707e9af1&units=metric',
        loading: true,
        id:{},
        data:{ 
            headers:[
                {name:"Ciudad:",value:"name"},
                {name:"Temperatura",value:"Temperatura"},
                {name:"Presión",value:"Presion"},
                {name:"Humedad",value:"Humedad"}
            ],
            rows:{summary:[]}
        }
	};

	componentDidMount() {
		const { selectedCity } = this.state;
		this.getCityWeaether(selectedCity);
	}

	getCityWeaether = async (cityId) => {
		try {
			const nextState = produce(this.state, (draft) => {
				draft.loading = true;
			});
            this.setState(nextState);
			const response = await WebServices.getWeatherByCityURL({
				url: cityId
			});
			const nextState2 = produce(this.state, (draft) => {
				draft.response = response;
				draft.loading = false;
			});
			this.setState(nextState2);
			console.log('TCL: getCityWeaether -> response', response);
		} catch (e) {}
    };

	showWeaether = (cityId) => {
		console.log('TCL: showWeaether -> cityId', cityId);
		this.getCityWeaether(cityId);
    };
    
    showWeaether2 = (optionId) => {
        this.getCityWeaether(this.state.id);
    }

    onChange = (event) => {
        const nextState = produce(this.state, (draft) => {
            draft.id = event.target.value;
        });
        this.setState(nextState);
    }

    addRow=()=>{
        const nextState = produce(this.state,(draft)=>{
            let data = {
                name:this.state.response && this.state.response.name,
                Temperatura:this.state.response && this.state.response.main && this.state.response.main.temp,
                Presion:this.state.response && this.state.response.main && this.state.response.main.pressure,
                Humedad:this.state.response && this.state.response.main && this.state.response.main.humidity
            };
            draft.data.rows.summary = draft.data.rows.summary.concat(data);
        });
        this.setState(nextState);
        console.log(this.state.data.rows);
    }

	render() {
		const { response, cities, loading, option } = this.state;
		const iconUrl = response && response.weather && 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
		console.log('TCL: render -> iconUrl', iconUrl);
		console.log('TCL: Home -> render -> response', response);

		return (
			<div className={styles.main}>
                <div>
                <Input label={""} onChange={this.onChange} />
                </div>
				<ul>
					{option.map((optionSelected) => {
						return (
							<li className={styles.city} onClick={() => this.showWeaether2(optionSelected.id)}>
								{optionSelected.name}
							</li>
						);
					})}
				</ul>
                <div>
                    <Button label={'New'} type={'plus'} onClick={this.addRow}/>
                </div>
				<div className={styles.results}>
					<ul>
                        <li>Ciudad: {response && response.name}</li>
						<li>Descripción: {response && response.weather && response.weather[0].description}</li>
						<li>Temperatura: {response && response.main && response.main.temp}</li>
						<li>Presión: {response && response.main && response.main.pressure}</li>
						<li>Humedad: {response && response.main && response.main.humidity}</li>
						<li>Temp Min: {response && response.main && response.main.temp_min}</li>
						<li>Temp Máx: {response && response.main && response.main.temp_max}</li>
					</ul>
					{!loading ? (
						<img src={iconUrl} alt="" />
					) : (
						<div className="sweet-loading">
							<ClipLoader sizeUnit={'px'} size={50} color={'#123abc'} loading={this.state.loading} />
						</div>
					)}
				</div>

                <div className={styles.third_container}>
                    <div>
                        <Table headers={this.state.data.headers}
                            data={this.state.data.rows} caption={"Tabla de contenido"}
                        />
                    </div>
                    <div>
                        <SimpleBartChart newData={this.state.data.rows.summary} 
                        // label={"name"}
                            llaves={["Temperatura","Presion","Humedad"]} 
                            fill={[
                                "rgba(200,0,0,.2)",
                                "rgba(0,200,0,.2)",
                                "rgba(200,100,0,.2)"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ]} 
                            alto={150} ancho={600}
                        /> 
                    </div>
                </div>

			</div>
		);
	}
});