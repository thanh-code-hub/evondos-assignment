"use client"
import {PatientDTO} from "@/dto/PatientDTO";
import {useEffect, useState} from "react";
import PatientForm from "@/components/PatientForm";
import {useRouter} from "next/navigation";

export default function PatientView ({ params }: {params: Promise<{ id: string }>})  {
    const [data, setData] = useState<PatientDTO>();
    const router = useRouter();

    useEffect(() => {
        async function fetchPosts() {
            const id = (await params).id
            const req = await fetch('http://localhost:3001/api/data/patient/'+id)
            const res = await req.json()
            setData(res)
        }
        fetchPosts()
    }, [])

    const onSubmit = (patientData: PatientDTO) => {
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
            await req.json()
            router.push("/") // update local data once the request is successful
        }
        sendData(patientData)
    }

     return <PatientForm data={data} onSubmit={onSubmit} />
}