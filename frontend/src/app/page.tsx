import TableAndFilter from "@/components/TableAndFilter";

export default async function Home() {

    const response = await fetch('http://localhost:3001')
    const data = await response.json()

    return (
        <div className="p-4">
            <TableAndFilter data={data} />
        </div>
    )
}
