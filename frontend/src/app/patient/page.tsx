"use client"
import PatientForm from "@/components/PatientForm";
import {PatientDTO} from "@/dto/PatientDTO";
import {useRouter} from "next/navigation";

export default function NewPatient () {
    const router = useRouter()

    const handleSubmit = (data: PatientDTO) => {
        async function createNewPatient(newData: PatientDTO) {
            const req = await fetch('http://localhost:3001/api/data/patient/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            const res = await req.json()
            console.log(res)
            router.push("/")
        }
        createNewPatient(data)
    }

    return <PatientForm onSubmit={handleSubmit}/>
}