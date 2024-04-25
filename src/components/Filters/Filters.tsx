import styles from './filters.module.css';
import FiltersForm from '../FiltersForm/FiltersForm';
import InputSquare from '../InputSquare/InputSquare';
import InputCircle from '../InputCircle/InputCircle';
import { connectionList, airlinesList } from '../../../utils/constants';
import { useState, ChangeEvent, useEffect } from 'react';


export default function Filters() {

  const [inputValue, setInputValue] = useState<{value:string[]}>({
    "value": []});

const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type == 'checkbox') {
        if (target.checked) {
            console.log('Checked:', target.value);
            setInputValue({
                "value": [...inputValue.value, target.value]
            });
        } else {
            console.log('Unchecked:', target.value);
            setInputValue(prevState => ({
                "value": prevState.value.filter((item: string) => item !== target.value)
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
        <FiltersForm title="Компании"  handlechange={handleFormChange}> 
        <InputCircle array={airlinesList} />
        </FiltersForm>
      </div>
    </div>
  )
}
