function subscribe(eventName:string, listener:() => {}) {
    if (typeof window !== "undefined") {
        document.addEventListener(eventName, listener);
    }
}
  
function unsubscribe(eventName:string, listener:() => {}) {
    if (typeof window !== "undefined") {
        document.removeEventListener(eventName, listener);
    }
}
  
function publish(eventName:string, data:any) {
    if (typeof window !== "undefined") {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }
}
  
export { publish, subscribe, unsubscribe};