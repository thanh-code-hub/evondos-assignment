import TableAndFilter from "@/components/TableAndFilter";
import Link from "next/link";

export default async function Home() {

    const response = await fetch('http://localhost:3001/api/data/patients')
    const data = await response.json()

    return (
        <div className="p-4 bg-gray-100 h-full">
            <div className="mb-10 w-full p-t-4 h-fit">
                <Link href="/patient" className="text-white p-2 rounded-full bg-green-900">
                    Create new patient
                </Link>
            </div>
            <TableAndFilter data={data} />
        </div>
    )
}
