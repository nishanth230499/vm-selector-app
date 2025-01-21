import * as React from 'react';
import './styles.scss';
import downIcon from './../../assets/down-arrow.svg';

interface IDropDown {
    options : string[];
    selected?: string;
    default?: string;
    onChange : (option:string) => void;
}

export const DropDown: React.FC<IDropDown> = (props: IDropDown) => {
    const [optionsActive, setOptionsActive] = React.useState(false);

    const selectOption = (option:string) =>{
        props.onChange(option);
        setOptionsActive(false);
    }

    return(
        <div className="drop-down">
            <button className="drop-btn" onClick={()=>{setOptionsActive(!optionsActive)}}>
                {props.selected ? props.selected : props.default}
                <img
                src={downIcon}
                alt="down-icon"
                className="down-icon"
                />
            </button>
            { optionsActive && <div className="dropdown-content">
                {props.options.map( (option) => <div onClick={ () => selectOption(option)} className="dropdown-option" key={option}>{option}</div> )}   
            </div> }
            
        </div>
    )
}