import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction, 
  useState
} from 'react';
import AppInput from "../../ui/input/AppInput";
import AppButton from "../../ui/button/AppButton";
import classes from "./UserFilter.module.css";

export interface IUserFilter {
  filter: {
    query: string
  },
  setFilter: Dispatch<SetStateAction<IUserFilter["filter"]>>,
}

const UserFilter: FC<IUserFilter> = ({setFilter}) => {
  const [temporalFilter, setTemporalFilter] = useState('')
  
  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    setFilter({query: temporalFilter})
  }
  
  const clearFilter = () => {
    setTemporalFilter('')

    setFilter({query: ''})
  }
  
  return (
    <form 
      className={classes.userFilter} 
      onSubmit={onFormSubmit}
    >
      <AppInput
        value={temporalFilter}
        onChange={e => setTemporalFilter(e.target.value)}
        placeholder='Введите текст' 
      />
      
      <AppButton 
        type='button' 
        onClick={clearFilter}
      >
        Отчистить
      </AppButton>
      
      <AppButton>
        Поиск
      </AppButton>
    </form>
  );
};

export default UserFilter;