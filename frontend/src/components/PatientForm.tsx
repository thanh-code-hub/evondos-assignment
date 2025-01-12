import {useEffect, useState} from "react";
import {PatientDTO} from "@/dto/PatientDTO";
import {useRouter} from "next/navigation";
import {dateParser} from "../../utils/date";


interface PatientFormProps {
    onSubmit: (patient: PatientDTO) => void;
    data?: PatientDTO;
}

export default function PatientForm(props: PatientFormProps) {
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [condition, setCondition] = useState("");
    const [nextAppointment, setNextAppointment] = useState("")
    const router = useRouter()

    const {onSubmit, data} = props

    useEffect(() => {
        if (data) {
            setName(data.name)
            setDOB(dateParser(data.dob))
            setCondition(data.condition)
            if(data.next_appointment)
                setNextAppointment(dateParser(data.next_appointment))
        }
    }, [data])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData: PatientDTO = {
            name,
            dob,
            condition,
            next_appointment: nextAppointment
        }
        if (data?.id)
            formData.id = data.id;

        onSubmit(formData)
    }

    return <>
        <h3 className="text-center mb-3 p-4 text-4xl">
            {data ? "Update patient detail" : "Create new patient"}
        </h3>
        <div className="p-4 flex flex-col items-center">
            <div className="flex flex-row w-full justify-evenly">
                <div className="flex flex-col ">
                    <label htmlFor="name">Name</label>
                    <input className="border border-emerald-950 rounded-md" name="name" type="text" value={name}
                           onChange={(event) => {
                               setName(event.target.value)
                           }}/>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="dob">Date of birth</label>
                    <input className="border border-emerald-950 rounded-md" name="dob" type="date" value={dob}
                           lang="fi-FI"
                           onChange={(event) => {
                               setDOB(event.target.value)
                           }}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="condition">Condition</label>
                    <input className="border border-emerald-950 rounded-md" name="condition" type="text"
                           value={condition}
                           onChange={(event) => {
                               setCondition(event.target.value)
                           }}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="next_appointment">Next appointment</label>
                    <input className="border border-emerald-950 rounded-md" name="next_appointment" type="date"
                           lang="fi-FI"
                           value={nextAppointment}
                           onChange={(event) => {
                               setNextAppointment(event.target.value)
                           }}/>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center mt-4 ">
                <button onClick={handleSubmit} className="text-white p-2 rounded-full bg-green-900 min-w-20 mr-4">
                    Save
                </button>
                <button onClick={() => {
                    router.push("/")
                }} className="text-white p-2 rounded-full bg-red-800 min-w-20">
                    Cancel
                </button>
            </div>
        </div>
    </>
}