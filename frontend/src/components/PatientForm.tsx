import {useEffect, useState} from "react";
import {PatientDTO} from "@/dto/PatientDTO";


interface PatientFormProps {
    onSubmit: (patient: PatientDTO) => void;
    data?: PatientDTO;
}

export default function PatientForm(props: PatientFormProps) {
    const [name, setName] = useState("");
    const [dob, setDOB] = useState("");
    const [condition, setCondition] = useState("");

    const {onSubmit, data} = props

    useEffect(() => {
        if(data) {
            setName(data.name)
            setDOB(data.dob)
            setCondition(data.condition)
        }
    },[data])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData: PatientDTO = {
            name, dob, condition,
        }
        if(data?.id)
            formData.id = data.id;

        onSubmit(formData)
    }

    return <form>
        <input className="border border-emerald-950 rounded-md" name="name" type="text" value={name}
               onChange={(event) => {setName(event.target.value)}}/>
        <input className="border border-emerald-950 rounded-md" name="dob" type="text" value={dob}
               onChange={(event) => {setDOB(event.target.value)}}/>
        <input className="border border-emerald-950 rounded-md" name="condition" type="text" value={condition}
               onChange={(event) => {setCondition(event.target.value)}}/>
        <button onClick={handleSubmit}>Save</button>
    </form>
}