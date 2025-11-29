import React from 'react';
import { Business } from '../../components/business/Business.jsx';

 import {BusinessInput } from '../../components/business-input/BusinessInput.jsx';


export const BusinessPage = () => {
    return (
        <div className="business-page-container"> 
            
     
            <Business />
            
        
            <BusinessInput />
            
        </div>
    );
};