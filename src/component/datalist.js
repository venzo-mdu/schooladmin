import React, { useEffect } from 'react'
import Popup from '../component/popup/popup'
import { db } from '../firebase'
import { v4 } from "uuid";
import { useState } from 'react'
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import '../component/popup/popup.css'
import student from '../content/studentData.json'

const Datalist = (props) => {
    const data = props.data;
    const initialValues = {
        name: "",
        class: "",
        course: "",
        day: "",
    };
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const [buttonPopup, setButtonPopup] = useState(false);
    const [titleInput, setTitleInput] = useState(values.name)
    const [classInput, setClassInput] = useState("")
    const [courseInput, setCourseInput] = useState("")
    const [indexs, setIndex] = useState('')
    const [list, setList] = useState([])
    const [formtitle, setFormtitle] = useState([])

    const createform = () => {

        if (data.title === 'Student Details') {
            setList(student[0]['formdata '].studentdata)
            setFormtitle(student[0].tabletitle.studenttitle)

        } else if (data.title === 'Teacher Details') {
            setList(student[0]['formdata '].teacherdata)
            setFormtitle(student[0].tabletitle.teachertitle)

        }

    }

    const createData = async () => {

        const docref = doc(db, 'schoolentry', 'details');
        const details = await getDoc(docref);

        const datalist = {
            id: v4(),
            name: values.name,
            class: values.class,
            course: values.course
        }
        const datalist1 = {
            id: v4(),
            name: values.name,
            class: values.class,
            course: values.course,
            day: values.day
        }
        if (data.title === 'Student Details') {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'students[0].tablecontent': [datalist]
                })
            } else {
                data.tablecontent.push(datalist)
                await updateDoc(docref, {
                    'students.tablecontent': data.tablecontent
                })
            }
        }
        if (data.title === "Teacher Details") {
            if (details.data() === undefined) {
                await setDoc(docref.data(), {
                    'teacher[0].tablecontent': [datalist1]
                })
            } else {
                data.tablecontent.push(datalist1)
                await updateDoc(docref, {
                    'teacher.tablecontent': data.tablecontent
                })
            }
        }

        setTitleInput('')
        setClassInput('')
        setCourseInput('')
    }

    const editdata = async (value, index) => {

        setButtonPopup(true)
        setIndex(index)
        if (data.title === 'Student Details') {
            data.tablecontent.map(item => {
                if (item.id === value.id) {   
                    setValues({
                        ...values,
                       name:item.name,
                       class:item.class,
                       course:item.course
                    });
                    console.log(values)
                }
            })
        }
        if (data.title === "Teacher Details") {
            data.tablecontent.map(item => {
                if (item.id === value.id) {
                    setTitleInput(item.name)
                    setClassInput(item.class)
                    setCourseInput(item.course)
                }
            })
        }
    }

    const updatedata = async () => {
        data.tablecontent[indexs].name = titleInput
        data.tablecontent[indexs].class = classInput
        data.tablecontent[indexs].course = courseInput
        const docref = doc(db, 'schoolentry', 'details');

        if (data.title === "Student Details") {
            await updateDoc(docref, {
                'students.tablecontent': data.tablecontent
            })
        } else if (data.title === "Teacher Details") {
            await updateDoc(docref, {
                'teacher.tablecontent': data.tablecontent
            })
        }
    }
    const deletedata = async (indexs) => {
        data.tablecontent.splice(indexs, 1)
        const docref = doc(db, 'schoolentry', 'details');

        if (data.title === "Student Details") {
            await updateDoc(docref, {
                'students.tablecontent': data.tablecontent
            })
        } else if (data.title === "Teacher Details") {
            await updateDoc(docref, {
                'teacher.tablecontent': data.tablecontent
            })
        }
    }

    const cleardata = () => {
        setButtonPopup(true)
        setTitleInput('')
        setClassInput('')
        setCourseInput('')
        createform()

    }

    useEffect(() => {
        createform()
    })
    return (
        <div>
            <div>
                <p>{data?.title}</p>
                <button onClick={() => cleardata()}>Add</button>
                <div>
                    <table className='table w-50 my-5'><tr>
                        {formtitle.map(item => {
                            return <th>{item}</th>
                        })}
                    </tr>
                        {data?.tablecontent?.map((item, index) => {
                            return <tr>
                                <td>{item.name}</td>
                                <td>{item.name ? index : ''}</td>
                                <td>{item.class}</td>
                                <td>{item.course}</td>
                                {item.day ? <td>{item.day}</td> : ""}
                                <td value={item.id} onClick={() => editdata(item, index)}>Edit</td>
                                <td value={item.id} onClick={() => deletedata(index)}>delete</td>
                            </tr>
                        })}
                    </table>
                </div>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <p id='joinourteamText'>add details</p>
                <form>
                    {list.map(item => {
                        return <>
                            <label>
                                {item.lable}
                            </label>
                            <input type={item.type} name={item.name} required={item.required} onChange={handleInputChange} /><br />
                        </>
                    })}
                </form>


                {/* <label>Name</label><input className='Fname' name='name' required type="text" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} /><br></br>
                <label>class</label><input className='Femail' name='class' required type="text" value={classInput} onChange={(e) => setClassInput(e.target.value)} /><br></br>
                <label>Course</label><input className='Fphone' name='course' required type="text" value={courseInput} onChange={(e) => setCourseInput(e.target.value)} /> */}
                <p className='Fbutton' onClick={createData}>Add</p>
                <p className='Fbutton' onClick={updatedata}>Edit</p>
            </Popup>
        </div>
    )
}

export default Datalist