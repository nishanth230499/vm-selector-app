import * as React from 'react';
import './styles.scss';

interface IButton{
    value:string;
    color:string;
    onClick: ()=>void;
    disabled?:boolean;
    disabledvalue?:string
}

export const Button: React.FC<IButton> = (props:IButton) => {
    return(
        <div>
        {props.disabled ? 
            <button className="btn" style={{
                backgroundColor: `${props.color}`,
            }} onClick={props.onClick} disabled>{props.disabledvalue}</button>
            :
            <button className="btn" style={{
                backgroundColor: `${props.color}`,
            }} onClick={props.onClick} >{props.value}</button>   
        }
        </div>
        
    )
}