import * as React from 'react'
import { Button } from 'reactstrap';
import ReactMap from './ReactMap';


const Countries = () => {
    return <div className="main-content">
            <h1 >Countries list!</h1>
            <p>This is where we will show the countries.</p>
            <Button color="danger">Danger!</Button>
            <ReactMap/>
        </div>
    }

    export default Countries; 
