import React, {useCallback, useEffect, useRef, useState} from 'react';
import { fetchContentByPageNum } from '../apiService';
import ContentCard from '../components/ContentCard';
import ContentHeader from '../components/ConentHeader';

const ContentListing = () => {

    const [ visiblecontent,  setVisibleContent] = useState([]);
    const [ pageMeta, setPageMeta] = useState({});
    const maxPages = useRef(1);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1)
    const initalPageLoad = useRef();
    const [searchConfig, setSearchConfig] = useState({query: ''});


    const observerRef = useRef();
    const initPageListing = useCallback(async(pageNum = 1) => {
        let contentResponse
        try {
            setLoading(true);
            contentResponse = await fetchContentByPageNum(pageNum);
        } catch(err) {
            contentResponse = {};
        }

        if(Object.keys(contentResponse).length) {
            const pageMeta = contentResponse.page;
            setPageMeta(pageMeta);
            setLoading(false);
            const { "total-content-items": totalContentItems,"page-size-returned": pageSizeReturned } = pageMeta
            if(+pageMeta["page-num-requested"] === 1) {
                maxPages.current =  Math.ceil(+totalContentItems / +pageSizeReturned);
            }
            setVisibleContent(cont => [
                ...cont, 
                ...((contentResponse?.page?.["content-items"]?.content || []).map((item, index) => ({...item, id: index + cont.length}))),
            ]);
        }

    }, []);
 
    useEffect(() => {
        initPageListing(pageNumber);
    }, [pageNumber])

    const loaderRef = useCallback((node) => {
        if(loading) {
            return;
        }
        if(!node) {
            return;
        }

        if(observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(pageNumber === 1 && !initalPageLoad.current) {
                        initalPageLoad.current = true;
                        return;
                    }
                    setPageNumber(pgNum => pgNum + 1 <=  maxPages.current ? pgNum +1 : pgNum );
                }
            })}, {
                root: null,
                rootMargin: '0px 0px 25% 0px',
                threshold: 0
            });
            

        observerRef.current.observe(node);
    }, [loading]);

    const handleSearch = ({mode, query}) => {
        setSearchConfig({
            mode,
            query,
        });
    }

    const regex = new RegExp(`${searchConfig.query}`, 'i');
    return (
        <div>
             <ContentHeader
                searchConfig={searchConfig}
                title={pageMeta.title}
                onSearch={handleSearch}
            />  
            <div className="gridContainer" >         
                {[...visiblecontent.filter(item => searchConfig.query === '' || regex.test(item.name)).map((item, index) => <ContentCard  key={item.id} content={item} index={index} lastIndex={visiblecontent.length -1} ref={loaderRef}/>)]}
            </div>
        </div>
    )


}

export default ContentListing;