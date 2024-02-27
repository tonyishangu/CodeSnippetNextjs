import { db } from "@/db";
import Link from "next/link";

// make it a dynamic route
export const dynamic = 'force-dynamic'

// make the component async
export default async function Home() {
  // make a request to the data base
  const snippets = await db.snippet.findMany();
  // render the data
  const renderedSnippet = snippets.map((snippet) => (
    <Link 
    href={`snippets/${snippet.id}`}
    className="flex justify-between items-center p-2 border rounded" 
    key={snippet.id}>
      <div>
      {snippet.title}
      </div>
      <div>View</div>
    </Link>
  ));
  return (
    <>
    <div className='flex m-2 justify-between items-center'>
      <h1 className="font-bold text-xl">Snippets</h1>
      <Link href='snippets/new'className="border p-2 rounded">New</Link>
    </div>
    <div className="flex flex-col gap-2">
    {renderedSnippet}
    </div>
    </>
)}
