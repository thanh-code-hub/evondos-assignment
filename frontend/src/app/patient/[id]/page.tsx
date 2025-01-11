"use client"
import {PatientDTO} from "@/dto/PatientDTO";
import {useEffect, useState} from "react";

export default function PatientView ({ params }: {params: Promise<{ id: string }>})  {
    const [data, setData] = useState<PatientDTO>({
        name: "",
        dob: "",
        condition: ""
    });

    useEffect(() => {
        async function fetchPosts() {
            const id = (await params).id
            const req = await fetch('http://localhost:3001/api/data/patient/'+id)
            const res = await req.json()
            setData(res)
        }
        fetchPosts()
    }, [])

    const onSubmit = e => {
        e.preventDefault()

        async function sendData(newData: PatientDTO) {
            console.log(newData);
            const req = await fetch('http://localhost:3001/api/data/patient/'+newData.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            const res = await req.json()
            setData(res) // update local data once the request is successful
        }
        sendData(data)
    }

    const updateValue = (e) => {
        const valueName = e.target.getAttribute('name')
        console.log(valueName)
        setData({
            ...data,
            [valueName]: e.target.value
        })
    }

     return data && <form >
         <input className="border border-emerald-950 rounded-md" name="name" type="text"  value={data.name} onChange={updateValue}/>
         <input className="border border-emerald-950 rounded-md" name="dob" type="text" value={data.dob} onChange={updateValue}/>
         <input className="border border-emerald-950 rounded-md" name="condition" type="text" value={data.condition} onChange={updateValue}/>
         <button onClick={onSubmit}>Save</button>
     </form>
}