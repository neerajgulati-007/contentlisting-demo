export class IntersectionObserverSingleton {
    static instance;

    static getInstance(callback) {
        if(!IntersectionObserver.instance) {
            IntersectionObserver.instance = new IntersectionObserver(callback, {
                root: null, // Defaults to the viewport
                rootMargin: '0px',
                threshold: 0.5 // Trigger when 50% of the element is in view
              });
        }
        return IntersectionObserver.instance;
    }
}

const observeElement = (callback) => {
    const observer = IntersectionObserverSingleton.getInstance(callback);
    return observer;
    //observer.observe(element);
  };

export default observeElement;