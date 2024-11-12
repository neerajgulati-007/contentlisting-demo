import React, {useRef, useState, useEffect, useCallback} from 'react';
import { IMAGE_ASSETS, API_BASE } from '../constants';

const ContentHeader = ({
    searchConfig,
    title,
    onSearch,
}) => {

    const scrolledRef = useRef(false);

    const [isScrolled, setIsScrolled] = useState();
    const onSearchIconClick = useCallback(() => {
        if(searchConfig.mode !== 'SEARCH') {
            onSearch({mode: 'SEARCH', query: ''});
        }
    }, [searchConfig, onSearch]);

    const onBackIconClick = useCallback(() => {
        if(searchConfig.mode === 'SEARCH') {
            onSearch({mode: '', query: ''});
        }
    }, [searchConfig, onSearch]);


    const onSearchInput = useCallback(e => {
        console.log(e.target.value);
        onSearch({mode: 'SEARCH', query: e.target.value});
    }, [onSearch]);

    const {mode } = searchConfig

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 5 && !scrolledRef.current) {
                scrolledRef.current =true;
                setIsScrolled(true);
            } else if(window.scrollY === 0){
                scrolledRef.current =  false;
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);

    }, [])

    return (
        <>
        <div 
            className={`contentHeader ${isScrolled  ? 'sticky': ''}`}
        >
            <div className="backIconContainer">
                <img 
                    alt="back from search"
                    className="backIcon" src={`${API_BASE}/${IMAGE_ASSETS.BACK_ICON}`} onClick={onBackIconClick} /> 
            </div>
            {
                mode === 'SEARCH' ?
                    <div className='inputContainer'>
                        <input type="text" onChange={onSearchInput} maxLength={30} autoFocus />
                    </div> : 
                    <div className="contentTitle">{title}</div>
            }
            <div className="searchIconContainer">
                <img 
                    alt="search"
                    className="searchIcon" 
                    src={`${API_BASE}/${IMAGE_ASSETS.SEARCH_ICON}`}
                    onClick={onSearchIconClick}
                />
            </div>
        </div>
        </>
    )

}

export default ContentHeader;