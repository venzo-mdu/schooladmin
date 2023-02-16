import React from 'react'

const Datalist = (props) => {
    // console.log(props.data.tableHeading, 'datas')
    const data = props.data;
    return (
        <div>
            {data.map((item) => {
                return <div>
                    <p>{item.title}</p>
                    {console.log(item.teacherContent, "data")}
                    <div>
                        <table>
                            <tr>
                                <th>{item.tableHeading.name}</th>
                                <th>{item.tableHeading.id}</th>
                                <th>{item.tableHeading.class}</th>
                                <th>{item.tableHeading.subject}</th>
                            </tr>
                            {item.teacherContent.data.map(item => {
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

export default Datalist