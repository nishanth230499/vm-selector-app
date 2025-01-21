import * as React from 'react';
import './styles.scss';
import {Button} from './../Button'

export interface ImageDetails{
    "id":string,
    "name":string,
    "detail":string,
    "versions":string[],
    "cost":number,
    "version"?:string
}

export interface IImageCard{
    image:ImageDetails;
    version:string;
    onSelect: (version:string)=>void;
    isImgselected?:boolean;
    change?:boolean;
}

export const ImageCard: React.FC<IImageCard> = (props:IImageCard) => {
    const [selected, setSelected] = React.useState(props.image.versions[0]) 
    return(
        
        <div className="image-card">
            <div className="image-image"></div>
            <div className="image-desc">
                <h2>{props.image.name}</h2>
                <p>{props.image.detail}</p>
            </div>
            {!props.isImgselected ?
                <div className="version-select">
                    {props.change ? props.image.versions.map( (version) => (
                        <div key={version}>
                            {selected===version ?
                                <input type="radio" name={`${props.image.id}-radio`} checked onChange={()=>{setSelected(version)}} placeholder={`${props.image.id}-radio`}/>
                                : <input type="radio" name={`${props.image.id}-radio`} onChange={()=>{setSelected(version)}} placeholder={`${props.image.id}-radio`}/>
                            }
                            {version}
                        </div>
                    )):
                        <div>
                            <input type="radio" checked /> {props.version}
                        </div>
                    }
                    {props.change && <Button value="Select" color='blue' onClick={()=>{props.onSelect(selected)}}/>}
                </div>
                :
                <div className="version-select">
                    {props.image.versions.map( (version) => (
                        <div key={version}>
                            {selected===version ?
                                <input type="radio" name={`${props.image.id}-radio`} checked onChange={()=>{setSelected(version)}} placeholder={`${props.image.id}-radio`}/>
                                : <input type="radio" name={`${props.image.id}-radio`} onChange={()=>{setSelected(version)}} placeholder={`${props.image.id}-radio`}/>
                            }
                            {version}
                        </div>
                    ))}
                {selected===props.version ?
                <Button value="Selected" color='blue' onClick={()=>{props.onSelect(selected)}} disabled={true}  disabledvalue="Selected"/>
                :
                <Button value="Select" color='blue' onClick={()=>{props.onSelect(selected)}}/>
            }
            </div>
            }
        </div>
    )
}