import {PatientDTO} from "@/dto/PatientDTO";

export default async function PatientView ({ params }: {params: Promise<{ id: string }>})  {
    const id = (await params).id
    console.log(id)

    const response = await fetch('http://localhost:3001/api/data/patient/'+id)
    const data: PatientDTO = await response.json()
    console.log(data)

     return <form action="/update">
         <input name={"name"} type="text"  value={data.name}/>
         <input name="dob" type="text" value={data.dob}/>
         <input name="condition" type="text" value={data.condition}/>
         <button type={"submit"}>Save</button>
     </form>
}