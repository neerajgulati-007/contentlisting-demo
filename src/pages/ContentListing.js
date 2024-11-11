import React, {useCallback, useEffect, useRef, useState} from 'react';
import { fetchContentByPageNum } from '../apiService';
import ContentCard from '../components/ContentCard';
import { IntersectionObserverSingleton } from '../utils/IntersecionObserver';
import ContentHeader from '../components/ConentHeader';

const ContentListing = () => {

    const [ visiblecontent,  setVisibleContent] = useState([]);
    const [ pageMeta, setPageMeta] = useState({});
    const [contentLoaded, setContentLoaded] = useState(6);
    const maxPages = useRef(1);
    const count = useRef(6);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1)
    const l = useRef();
    const g = useRef();
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
        console.log(contentResponse);

        if(Object.keys(contentResponse).length) {
            const pageMeta = contentResponse.page;
            setPageMeta(pageMeta);
            setLoading(false);
            if(+pageMeta["page-num-requested"] === 1) {
                const { "total-content-items": totalContentItems,"page-size-returned": pageSizeReturned } = pageMeta
                maxPages.current =  Math.ceil(+totalContentItems / +pageSizeReturned);
                // if(totalContentItems > (+pageNumRequested - 1) * +pageSizeRequested + +pageSizeReturned) {
                //     debugger;
                //     nextPageAvailable.current = true;
                // } else {
                //     debugger;
                //     nextPageAvailable.current = false
                // }
            }
            setVisibleContent(cont => [...cont, ...(contentResponse?.page?.["content-items"]?.content || [])]);
        }

    }, []);
    useEffect(() => {
        initPageListing(pageNumber)
        //observeLoader();
    }, []);

    //useEffect(() => {observeLoader()}, [contentLoaded]);

   // const loaderRef = useRef();

    const fetchMore =() => {
        count.current+=3
        setContentLoaded(count.current);
        console.log("ppp",count.current);
       // observeLoader();
        // setTimeout(() => observeLoader(), 500);
        //setLoading(true);
        
    };

    // const observeLoader = () => {
    //      if(observerRef.current) {
    //         debugger;
    //         observerRef.current.disconnect();
    //     }

    //     observerRef.current = new IntersectionObserver(entries => {
    //                 entries.forEach(entry => {
                        
    //                     if (entry.isIntersecting) {
    //                         //console.log("pppp", entry);
    //                             debugger;
                             
    //                             console.log("pppp", entry);
    //                             fetchMore();
                           
                            
                            
        
    //                         //observer.unobserve(loaderRef.current);
    //                         //setLoading(true);
    //                     } else {

    //                     }
    //                 },)
    //     }, {
    //         root: null, // Use the viewport
    //         rootMargin: `0px` // Trigger when 100px from the bottom
    //         });

    //     loaderRef && observerRef.current.observe(loaderRef.current)
    // }

    
    
   

    // useEffect(() => {
    //     if(!loading) {
    //         return;
    //     }
    //     // if(!loading) {
    //     //     setLoading(true);
    //     //     return;
    //     // }
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 debugger;
    //                 setLoading(false);
    //                 fetchMore();

    //                 //observer.unobserve(loaderRef.current);
    //                 //setLoading(true);
    //             }
    //         })
    //     });
    //     loaderRef && observer.observe(loaderRef.current)
    // }, [loading, fetchMore])
    // const observer = IntersectionObserverSingleton.getInstance(callback);
    // return observer;
    // debugger;
    //observer.observe(element);
    // const ref = useIntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 console.log("kkkk", entry, ref)
    //                 setVisible();
    //             } else {
    //                 debugger;
    //                 //setIsVisible(false);
    //             }
    //         })
    // });

    useEffect(() => {
        if(!l.current) {
            l.current = true;
            return;
        }
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
                    if(pageNumber === 1 && !g.current) {
                        g.current = true;
                        //observerRef.current.observe();
                        return;
                    }
                    setPageNumber(pgNum => pgNum + 1 <=  maxPages.current ? pgNum +1 : pgNum );
                    
                    //initPageListing();
                    //setLoading(true);
                }
            })}, {
                root: null, // default is viewport
                rootMargin: '0px 0px 25% 0px', // Trigger when 25% gap is left
                threshold: 0 // Trigger as soon as any part of the target is visible
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
                {[...visiblecontent.filter(item => searchConfig.query === '' || regex.test(item.name)).map((item, index) => <ContentCard  key={index} content={item} index={index} lastIndex={visiblecontent.length -1} ref={loaderRef}/>)]}
            </div>
        </div>
    )


}

export default ContentListing;