"use client"
import {useEffect, useState} from "react";
import {PatientDTO} from "@/dto/PatientDTO";
import {useRouter} from "next/navigation";

interface TableAndFilterProps {
    data: PatientDTO[]
}

export default function TableAndFilter(props: TableAndFilterProps) {
    const [name, setName] = useState<string>('');
    const [dob, setDOB] = useState<string>('');
    const [condition, setCondition] = useState<string>('');
    const [filteredData, setFilteredData] = useState<PatientDTO[]>([]);
    const router = useRouter()

    const handleFilter = () => {
        setFilteredData(props.data.filter(item => {
            if(name)
                return item.name.includes(name)
            else if (dob)
                return item.dob === dob
            else if (condition)
                return item.condition === condition
            return item
        }));
    }

    const handleDelete = (patientId: number) => {
        async function deletePatient(patientId: number) {
            fetch('http://localhost:3001/api/data/patient/'+patientId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(() => {
                    router.refresh()
                })
        }
        deletePatient(patientId)
    }

    useEffect(() => {
        setFilteredData(props.data);
    }, [props.data]);

    return <>
    <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" className="border border-gray-600 rounded-md" onChange={e => {
                setName(e.target.value)
            }}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="dob">Date of birth: </label>
            <input type="text" name="dob" id="dob" className="border border-gray-600 rounded-md" onChange={e => {
                setDOB(e.target.value)
            }}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="condition">Condition: </label>
            <input type="text" name="condition" id="condition" className="border border-gray-600 rounded-md" onChange={e => {
                setCondition(e.target.value)
            }}/>
        </div>
        <div>
            <button onClick={() => {
                handleFilter()
            }}>
                Filter
            </button>
        </div>
    </div>

    <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 bg-white">
            <thead>
            <tr className="bg-gray-300">
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold">ID</th>
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold">D.O.B</th>
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold">Condition</th>
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold"></th>
                <th className="px-4 py-2 border border-gray-400 text-left text-sm font-semibold"></th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-200 hover:bg-gray-300">
                    <td className="px-4 py-2 border   border-gray-400 text-sm">
                            {row.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-sm">
                        {row.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-sm">
                        {row.dob}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-sm">
                        {row.condition}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-sm center">
                        <button
                            onClick={() => router.push('/patient/' + row.id)}
                            className="p-2 rounded-md text-white bg-green-800"
                        >
                            View patient
                        </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-sm center">
                        <button
                            onClick={() => {
                                handleDelete(row.id)
                            }}
                            className="p-2 rounded-md text-white bg-red-800"
                        >
                            Delete patient
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    </>
}