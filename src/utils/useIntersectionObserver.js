import React, {useEffect, useRef} from "react";
import observeElement from "./IntersecionObserver";

const useIntersectionObserver = (callback) => {
    const observer = observeElement(callback);

    const ref = useRef();
    useEffect(() => {
        if(!ref.current) {
            return;
        }
        observer.observe(ref.current);

        return () => {
            observer.unobserve(ref.current);
        }
    }, [
      observer,  
    ]);

    return ref;
}

export default useIntersectionObserver;