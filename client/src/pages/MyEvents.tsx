import React, { useEffect } from 'react'
import { useContext } from 'react'
import { EventContext } from '@/context/EventContext'
import { getAllEvent } from '@/api'
const MyEvents = () => {
    useEffect(() => {
        const getEvents = async() => {
            const response = await getAllEvent()
            console.log(response)
        }
        getEvents()
    },[])
  return (
    <div>MyEvents</div>
  )
}

export default MyEvents