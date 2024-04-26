import styles from './filters.module.css';
import FiltersForm from '../FiltersForm/FiltersForm';
import InputSquare from '../InputSquare/InputSquare';
import InputCircle from '../InputCircle/InputCircle';
import { connectionList, airlinesList } from '../../../utils/constants';
import { useState, ChangeEvent, useEffect } from 'react';
import {filterByTransfer} from '../../redux/ticketsSlice.js';
import { useDispatch } from 'react-redux';


interface InputValue {
  value: number[];
  value2: string[];
}

export default function Filters() {

const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<InputValue>({
    "value": [],
    "value2": []});


useEffect(() => {
    dispatch(filterByTransfer(inputValue));
}, [inputValue]);

const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type == 'checkbox') {
        if (target.checked) {
            setInputValue(prevState => ({
              ...prevState,
              "value": [...prevState.value, Number(target.value)]
          }));
        } else {
            setInputValue(prevState => ({
              ...prevState,
                "value": prevState.value.filter((item: number) => item !== Number(target.value))
            }));     
        }
    }
};

const handleFormChange2 = (e: ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  if (target.type == 'checkbox') {
      if (target.checked) {
          setInputValue(prevState => ({
            ...prevState,
            "value2": [...prevState.value2, target.value]
        }));
      } else {
          setInputValue(prevState => ({
            ...prevState,
            "value2": prevState.value2.filter((item: string) => item !== target.value)
        }));    
      }
  }
};

useEffect(() => {
console.log('inputValue:', inputValue);
}, [inputValue]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FiltersForm title="Количество пересадок" handlechange={handleFormChange}> 
        <InputSquare array={connectionList}/>
        </FiltersForm>
      </div>
      <div className={styles.wrapper}>
        <FiltersForm title="Компании"  handlechange={handleFormChange2}> 
        <InputCircle array={airlinesList} />
        </FiltersForm>
      </div>
    </div>
  )
}
