'use client'
import type { Snippet } from "@prisma/client"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
import { snippetEdit } from "@/actions"

interface editProps {
    snippet: Snippet
}

export default function EditorSnippet ({ snippet }: editProps) {
    const [code, setCode] = useState(snippet.code)

    const handleChange = (value: string = '') => {
        setCode(value)
    }

    const editSnippetAction = snippetEdit.bind(null, snippet.id, code)

    return (
        <div>
            <Editor
            height='40vh'
            theme="vs-dark"
            language="javascript"
            defaultValue={snippet.code}
            options={{ minimap: {enabled: false} }}
            onChange={handleChange} />
            <form action={editSnippetAction}>
                <button type="submit" className='p-2 border rounded'> Save</button>
            </form>
        </div>
    )
}