import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimestamps } from '../utils'

const Tamstamp = () => {
    const timestamps = useSelector(state => state.timestamp)
    const user = useSelector(state => state.user)
    console.log(timestamps)
    const dispatch = useDispatch()
    useEffect(() => {
        getTimestamps().then(res => {
            console.log(res)
            dispatch({type: 'GET_TIMESTAMPS', data: res})
            console.log(timestamps)
        })
        // eslint-disable-next-line
    }, [])
    return (
        <div>
           <h1 style={{textAlign: 'center'}}>Timestamps Data </h1>
           {user.isAdmin ? 
            <table>
            <thead>
                <tr>
                    <td>S/N</td>
                    <td>Email</td>
                    <td>Timestamp</td>
                </tr>
            </thead>
            <tbody>
                {timestamps.map((timestamp, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{timestamp.email}</td>
                            <td>{timestamp.email}</td>
                        </tr>
                    )
                })}
            </tbody>
       </table> : 
       'You need to be an admin to view this!!'}
        </div>
    )
}

export default Tamstamp
