import React from 'react';
import { IMAGE_ASSETS, API_BASE } from '../constants';

const ContentHeader = ({
    searchConfig,
    title,
    onSearch,
}) => {
    const onSearchIconClick = () => {
        if(searchConfig.mode !== 'SEARCH') {
            onSearch({mode: 'SEARCH', query: ''});
        }
    };

    const onBackIconClick = () => {
        if(searchConfig.mode === 'SEARCH') {
            onSearch({mode: '', query: ''});
        }
    };


    const onSearchInput = (e) => {
        console.log(e.target.value);
        onSearch({mode: 'SEARCH', query: e.target.value});
    }
    const {mode, query } = searchConfig
    console.log("kkk", title);
    return (
    <div className="contentHeader">
         <div className="backIconContainer">
            <img className="backIcon" src={`${API_BASE}/${IMAGE_ASSETS.BACK_ICON}`} onClick={onBackIconClick} /> 
        </div>
        {
            mode === 'SEARCH' ?
                <div className='inputContainer'>
                    <input type="text" onChange={onSearchInput} autoFocus />
                </div> : 
                <div className="contentTitle">{title}</div>
        }
        <div className="searchIconContainer">
            <img 
                className="searchIcon" 
                src={`${API_BASE}/${IMAGE_ASSETS.SEARCH_ICON}`}
                onClick={onSearchIconClick}
            />
        </div>
    </div>)

}

export default ContentHeader;