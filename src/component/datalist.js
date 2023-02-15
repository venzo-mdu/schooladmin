import React from 'react'

const datalist =(props) => 
{
    console.log(props)
  return (
    <div>
      {props.data.map (item => {
        return <div>
            <p>{item.name}</p>
            <div>
                
            </div>
        </div>
      })}
    </div>
  )
}

export default datalist