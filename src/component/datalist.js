import React from 'react'

const datalist = (props) => {
    console.log(props)
    return (
        <div>
            {props.map(item => {
                return <div>
                    <p>{item.name}</p>
                    <div>

                        <table>
                            {item.tabletitle.map(item => {
                                return <tr>
                                    <th>{item.name}</th>
                                    <th>{item.id}</th>
                                    <th>{item.class}</th>
                                    <th>{item.subject}</th>
                                </tr>
                            })}
                            {item.tablecont.map(item => {
                                return <tr>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>{item.class}</td>
                                    <td>{item.subject}</td>
                                </tr>
                            })}
                        </table>


                    </div>
                </div>
            })}
        </div>
    )
}

export default datalist