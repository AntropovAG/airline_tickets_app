import styles from './filters.module.css';
import FiltersForm from '../FiltersForm/FiltersForm';
import InputSquare from '../InputSquare/InputSquare';
import InputCircle from '../InputCircle/InputCircle';
import { connectionList, airlinesList } from '../../../utils/constants';
import { useState, ChangeEvent, useEffect } from 'react';
import {filterTickets, sortTickets} from '../../redux/ticketsSlice.js';
import { useDispatch } from 'react-redux';


interface InputValue {
  connectionsFilter: number[];
  companyFilter: string[];
}

export default function Filters() {

const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<InputValue>({
    "connectionsFilter": [],
    "companyFilter": []});


useEffect(() => {
    dispatch(filterTickets(inputValue));
    dispatch(sortTickets());
}, [inputValue]);

const handleConnectionsFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type == 'checkbox') {
        if (target.checked) {
            setInputValue(prevState => ({
              ...prevState,
              "connectionsFilter": [...prevState.connectionsFilter, Number(target.value)]
          }));
        } else {
            setInputValue(prevState => ({
              ...prevState,
                "connectionsFilter": prevState.connectionsFilter.filter((item: number) => item !== Number(target.value))
            }));     
        }
    }
};

const handleCompanyFormChange = (e: ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  if (target.type == 'checkbox') {
      if (target.checked) {
          setInputValue(prevState => ({
            ...prevState,
            "companyFilter": [...prevState.companyFilter, target.value]
        }));
      } else {
          setInputValue(prevState => ({
            ...prevState,
            "companyFilter": prevState.companyFilter.filter((item: string) => item !== target.value)
        }));    
      }
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FiltersForm title="Количество пересадок" handlechange={handleConnectionsFormChange}> 
        <InputSquare array={connectionList}/>
        </FiltersForm>
      </div>
      <div className={styles.wrapper}>
        <FiltersForm title="Компании"  handlechange={handleCompanyFormChange}> 
        <InputCircle array={airlinesList} />
        </FiltersForm>
      </div>
    </div>
  )
}
