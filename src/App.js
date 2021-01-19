import React, { useState } from 'react';
import ReactJson from 'react-json-view'

import http from './api';

const App = () => {
    const [term, setTerm] = useState('')
    const [data, setData] = useState(null)
    const [limit, setLimit] = useState(20)
    const [disabled, setDisabled] = useState(false) 
    const handleSubmit = async (e) => {
        setDisabled(true)
        e.preventDefault()
        const trim = term.trim();
        const underscore = trim.replace(/ /g,"_");
        const response = await (await http.get(`/${underscore}?rel=/r/IsA&limit=${Number(limit)}`)).data;
        const result = response.edges.filter(result=>result.rel.label==='IsA')
        const sortedResult = result.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
        const objectResult = sortedResult.map(result=>result.end.label)
        const nestedObject = objectResult.reduce((res, key) => ({[key]: res}), {});
        setData(nestedObject)
        setDisabled(false)
    }
   
    return (
        <div style={styles.container} >
            <form onSubmit={handleSubmit} style={styles.form} >
                <input onChange={(e)=>setTerm(e.target.value)} value={term} />
                <select value={limit} onChange={e=>setLimit(e.target.value)} style={styles.select} > 
                    <option name="20"> 20</option>
                    <option name="50">50</option>
                    <option name="50">100</option>
                </select>
                <button disabled={disabled} type="submit" >submit</button>
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
    },
    select: {
        height: '22px'
    }
}
export default App;
