import { db } from "@/db"
import { notFound } from "next/navigation"
import EditorSnippet from "@/components/editForm"

interface EditProps {
    params: {
        id: string
    }
}

export default async function EditSnippet (props: EditProps) {
    const id = parseInt(props.params.id)
    const snippet = await db.snippet.findFirst({
        where: {
            id: id
        }
    })
    if(!snippet){
        return notFound()
    }

    return <EditorSnippet snippet={snippet}/>
}