import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getTimestamps } from '../utils'

const Timestamp = () => {
    const history = useHistory()
    const timestamps = useSelector(state => state.timestamp)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    if (!localStorage.getItem('userId')) {
        alert('You are not logged in1')
        history.push('/')
    }
    useEffect(() => {
        getTimestamps().then(res => {
            dispatch({type: 'GET_TIMESTAMPS', data: res})
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
                    <th>S/N</th>
                    <th>Email</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {timestamps.map((timestamp, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{timestamp.email}</td>
                            <td>{timestamp.timestamp.toDate().toString()}</td>
                        </tr>
                    )
                })}
            </tbody>
       </table> : 
       'You need to be an admin to view this!!'}
        </div>
    )
}

export default Timestamp
