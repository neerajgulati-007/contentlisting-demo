import React, {useState} from 'react';
import CONSTANTS, { IMAGE_ASSETS, IMAGE_PATH } from '../constants';

const ContentCard = React.forwardRef((props, ref) => {
    const {content: {name: contentName, "poster-image" : posterImage}, index, lastIndex} = props
    
    const [imageError, setImageError] = useState(false);

    const onImageError = () => {
        setImageError(true); 
    }
    const html = 
        (
            <>  
                <img 
                    className="contentImg"  
                    alt={`${contentName}`}
                src={
                    imageError ? `${CONSTANTS.API_BASE}/${IMAGE_ASSETS.DEFAULT_IMAGE}` : 
                    `${CONSTANTS.API_BASE}/${IMAGE_PATH}/${posterImage}`
                } onError={() => onImageError()}/>
                <div className="contentName">{contentName.length > 12 ? `${contentName.slice(0, 13)}...`: contentName }</div>
            </>);

    //Attach ref to oobserve last element via intersection observer
    if(index === lastIndex) {
        return (
            <div ref = {ref} className="content">
                {html}
            </div>
        );
    }
    else {
        return (
            <div className="content">
                {html}
            </div>
        )
    }


});

export default ContentCard;
