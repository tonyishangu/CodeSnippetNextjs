import { db } from "@/db"
import Link from "next/link"
import { notFound } from "next/navigation"
import { deleteSnippet } from "@/actions";

interface detailsProps {
    params: {
        id: string
    }
}
export default async function Details (props: detailsProps) {
    await new Promise((r) => setTimeout(r, 2000))
    const detailedSnippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    })
    if(!detailedSnippet){
        return notFound()
    }
    const deleteSnippetAction = deleteSnippet.bind(null, detailedSnippet.id)
    return (
        <>
    <div className='flex m-4 justify-between items-center'>
        <h1 className="text-xl font-bold">{detailedSnippet.title}</h1>
        <div className='flex gap-4'>
            <Link href={`/snippets/${detailedSnippet.id}/edit`} className="p-2 border rounded">Edit</Link>
            <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
            </form>
        </div>
    </div>
    <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
        <code>{detailedSnippet.code}</code>
    </pre>
        </>
)}

export async function generateStaticParams() {
    // get all snippets
    const snippets = await db.snippet.findMany()
    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString()
        }
    })
}