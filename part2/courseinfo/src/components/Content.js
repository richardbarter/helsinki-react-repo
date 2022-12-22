import React from 'react'
import Part from './Part'
import Total from './Total'


const Content = ({parts}) => {
    const total = parts.reduce((s, p) => {
        return s + p.exercises
    }, 0)

    return(
       <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <Total total={total} />
        </div>
    )


   
}

export default Content