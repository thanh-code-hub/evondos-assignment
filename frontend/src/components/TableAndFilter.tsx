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
        console.log(name, dob, condition)
        setFilteredData(props.data.filter(item =>
            (name && item.name.includes(name))
            || (dob && item.dob === dob)
            || (condition && item.condition === condition)
        ));
    }

    useEffect(() => {
        setFilteredData(props.data);
    }, []);

    return <>
    <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" className="border border-b-gray-600" onChange={e => {
                setName(e.target.value)
            }}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="dob">Date of birth: </label>
            <input type="text" name="dob" id="dob" className="border border-b-gray-600" onChange={e => {
                setDOB(e.target.value)
            }}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="condition">Condition: </label>
            <input type="text" name="condition" id="condition" className="border border-b-gray-600" onChange={e => {
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
        <table className="min-w-full border-collapse border border-gray-200 bg-white">
            <thead>
            <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">D.O.B</th>
                <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">Condition</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                        <button onClick={() => router.push('/patient/' + row.id)}>

                        {row.id}
                        </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">{row.name}</td>
                    <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">{row.dob}</td>
                    <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">{row.condition}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    </>
}