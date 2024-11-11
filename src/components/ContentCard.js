import React, {useState} from 'react';
import useIntersectionObserver from '../utils/useIntersectionObserver';
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
                <div className="contentName">{contentName}</div>
            </>);

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


    // return (
    //     <div className="content">
    //         {isVisible ? 
    //         <>  
    //             <img className="contentImg"  src={`${CONSTANTS.API_BASE}/${IMAGE_PATH}/${posterImage}`} />
    //             {contentName}
    //         </>: null}
    //     </div>
    // )
});

export default ContentCard;

/*


class IntersectionObserverSingleton {
  static instance = null;

  static getInstance() {
    if (IntersectionObserverSingleton.instance === null) {
      IntersectionObserverSingleton.instance = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.src = target.dataset.src;
            target.classList.add('loaded');
            observer.unobserve(target);
          }
        });
      });
    }
    return IntersectionObserverSingleton.instance;
  }
}

// Usage
const observeElement = (element) => {
  const observer = IntersectionObserverSingleton.getInstance();
  observer.observe(element);
};


class IntersectionObserverSingleton {
    static instance = null;

    constructor(callback) {
        if (IntersectionObserverSingleton.instance) {
            return IntersectionObserverSingleton.instance;
        }
        this.observer = new IntersectionObserver(callback);
        this.observedElements = new Set();
        IntersectionObserverSingleton.instance = this;
    }

    observe(element) {
        if (element) {
            this.observer.observe(element);
            this.observedElements.add(element);
        }
    }

    unobserve(element) {
        if (element) {
            this.observer.unobserve(element);
            this.observedElements.delete(element);
        }
    }
    
    disconnect() {
        this.observer.disconnect();
        this.observedElements.clear();
    }

    static getInstance(callback) {
        if (this.instance === null) {
            this.instance = new IntersectionObserverSingleton(callback);
        }
        return this.instance;
    }
}



import React, { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (callback) => {
    const observer = IntersectionObserverSingleton.getInstance(callback);
    const ref = useRef();

    useEffect(() => {
        observer.observe(ref.current);
        return () => {
            observer.unobserve(ref.current);
        };
    }, [observer]);

    return ref;
};

const Card = ({ id }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    });

    return (
        <div ref={ref} style={{ minHeight: '200px', border: '1px solid black', margin: '10px', backgroundColor: isVisible ? 'lightgreen' : 'lightcoral' }}>
            <h2>Card {id}</h2>
            {isVisible ? <p>This card is visible!</p> : <p>This card is hidden.</p>}
        </div>
    );
};

const App = () => {
    return (
        <div>
            {Array.from({ length: 10 }, (_, index) => (
                <Card key={index} id={index} />
            ))}
        </div>
    );
};

export default App;


*/