import React from 'react'

const Invites = () => {
    const data = [
        {
            eventName:"Honeymoon",
            eventDescription:"Shivam bhai ka honeymoon",
            invitedBy:"sonali"
        },
        {
            eventName:"Shaadi",
            eventDescription:"Shivam bhai ka Shaadi",
            invitedBy:"sonali"
        },
        {
            eventName:"Suhagraat",
            eventDescription:"Shivam bhai ka suhagraat",
            invitedBy:"sonali"
        },
    ]
  return (
    <div >
        <h1>My Invites</h1>
        <div className='flex'> 
            {
                data.map((event) => {
                    return(
                        <div className='flex flex-col border-4 m-5 bg-slate-200'>
                            <p>{event.eventName}</p>
                            <p>{event.eventDescription}</p>
                            <p>Invited By:   {event.invitedBy}</p>
                            <div className='flex flex-row'>
                                <button className = "m-2 bg-green-500 text-white p-2 hover:bg-green-600">Accept</button>
                                <button className = "m-2 bg-red-500 text-white hover:bg-red-600">Reject</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Invites