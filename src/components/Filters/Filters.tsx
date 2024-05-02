import styles from './filters.module.css';
import FiltersForm from '../FiltersForm/FiltersForm';
import InputSquare from '../InputSquare/InputSquare';
import InputCircle from '../InputCircle/InputCircle';
import { connectionList, airlinesList } from '../../../utils/constants';
import { useState, ChangeEvent, useEffect } from 'react';
import {filterTickets, sortTickets, setDisplayedFilters } from '../../redux/ticketsSlice.js';
import { useDispatch } from 'react-redux';


interface InputValue {
  connectionsFilter: number[];
  companyFilter: string[];
}

export default function Filters({setDisplayCount}) {

const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<InputValue>({
    "connectionsFilter": [],
    "companyFilter": []});


useEffect(() => {
    dispatch(filterTickets(inputValue));
    dispatch(setDisplayedFilters(inputValue));
    dispatch(sortTickets());
}, [inputValue]);

const handleConnectionsFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
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
    setDisplayCount(3);
};

const handleCompanyFormChange = (e: ChangeEvent<HTMLFormElement>) => {
  const target = e.target as HTMLFormElement;
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
  setDisplayCount(3);
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
