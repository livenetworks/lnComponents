import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let lnLocaleFormater = document.querySelectorAll('ln-locale-formatter');

lnLocaleFormater.forEach((element) => {
  const root = ReactDOM.createRoot(element);  
  const data = root._internalRoot.containerInfo.dataset;
  
  
  function render() {
    root.render(
      <React.StrictMode>
        <App
          number={data.number}
          locale={data.locale}
          style={data.style}
          currency={data.currency}     
        />
      </React.StrictMode>
    );
    
  }
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type == "attributes") {
        render();
      }
    });
  });
  
  observer.observe(document.querySelector('ln-locale-formatter'), {
    attributes: true //configure it to listen to attribute changes
  });
  render();
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  

});
