import React, { useState } from 'react';
import ReactJson from 'react-json-view'

import http from './api';

const App = () => {
    const [term, setTerm] = useState('')
    const [data, setData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const trim = term.trim();
        const underscore = trim.replace(/ /g,"_");
        const response = await (await http.get(`/${underscore}?rel=/r/IsA&limit=100`)).data;
        const result = response.edges.filter(result=>result.rel.label==='IsA')
        const sortedResult = result.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
        const objectResult = sortedResult.map(result=>result.end.label)
        const nestedObject = objectResult.reduce((res, key) => ({[key]: res}), {});
        setData(nestedObject)
    }
   
    return (
        <div style={styles.container} >
            <form onSubmit={handleSubmit} style={styles.form} >
                <input onChange={(e)=>setTerm(e.target.value)} value={term} />
                <button type="submit" >submit</button>
            </form>
            <div>
                {
                    data === null ? 
                    <div>Please enter text and submit</div>
                    :
                    <ReactJson src={data} enableClipboard={false} />
                }
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        justifyContent: 'center'
    },
    form: {
        marginBottom: '20px'
    }
}
export default App;
