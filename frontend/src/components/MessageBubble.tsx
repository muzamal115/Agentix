
import { X } from 'lucide-react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 
 
interface MessageBubbleProps {
  role:"user"|"assistant",
  content:string,
  images:[]|string[]
}

const MessageBubble = ({role,content,images}:MessageBubbleProps) => {
  const[lightBox,setLightBox]=useState<string>('')
  const isUser=role=="user"
  return (
    <div className={`flex ${isUser?"justify-end":"justify-start"}`}>
    <div className={`max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl  w-fit break-words overflow-hidden leading-relaxed
      ${isUser?'bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm'
        :'text-slate-200 rounded-tl-sm'}
      `}>
        {
          images.length>0&&(
            <div className="flex flex-wrap gap-3 mt-4">
             {
              images.map((img,i)=>(
                <img
                onClick={()=>setLightBox(img)}
                key={i}
                src={img}
                loading='lazy'
                onError={(e)=>e.currentTarget.remove()}
                className='w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition'
                />
              ))
             }
            </div>
          )
        }
 <Markdown remarkPlugins={[remarkGfm]}
 components={{
  h1: ({ children }) => (
                    <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-4 text-white">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-xl md:text-2xl font-semibold mt-5 mb-3 text-white">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-white">
                        {children}
                    </h3>
                ),

                h4: ({ children }) => (
                    <h4 className="text-base md:text-lg font-semibold mt-4 mb-2 text-white">
                        {children}
                    </h4>
                ),
                p: ({ children }) => (
                    <p className="mb-3 leading-7 text-slate-200">
                        {children}
                    </p>
                ),
                 strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                        {children}
                    </strong>
                ),

                em: ({ children }) => (
                    <em className="italic text-slate-300">
                        {children}
                    </em>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-slate-200">
                        {children}
                    </ul>
                ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-slate-200">
                        {children}
                    </ol>
                ),
                 li: ({ children }) => (
                    <li className="pl-1 leading-6">
                        {children}
                    </li>
                ),
                 a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                    >
                        {children}
                    </a>
                ),

                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 italic text-slate-300">
                        {children}
                    </blockquote>
                ),
                  hr: () => (
                    <hr className="my-6 border-white/10" />
                ),

                code: ({ children }) => (
                    <code className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-sm font-mono text-indigo-300">
                        {children}
                    </code>
                ), 
                  pre: ({ children }) => (
                    <pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm leading-6 shadow-lg">
                        {children}
                    </pre>
                ),
                 table: ({ children }) => (
                    <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full min-w-[500px] border-collapse text-sm">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => (
                    <thead className="bg-white/5">
                        {children}
                    </thead>
                ),

                tbody: ({ children }) => (
                    <tbody className="divide-y divide-white/5">
                        {children}
                    </tbody>
                ),

                tr: ({ children }) => (
                    <tr className="hover:bg-white/[0.03] transition-colors">
                        {children}
                    </tr>
                ),

                th: ({ children }) => (
                    <th className="px-4 py-3 text-left font-semibold text-white border-b border-white/10">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="px-4 py-3 text-slate-300">
                        {children}
                    </td>
                ),

                
                img: ({ src, alt }) => (
    <div className="group my-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20">
        <img
            src={src}
            alt={alt || "Generated image"}
            loading="lazy"
            className="
                block
                w-full
                max-h-[520px]
                object-contain
                bg-black/10
                transition-transform
                duration-300
                group-hover:scale-[1.01]
            "
        />
    </div>
),

                 del: ({ children }) => (
                    <del className="text-slate-500">
                        {children}
                    </del>
                ),


 }}
 >
     {content}
     </Markdown>
    </div>
    {
      lightBox && <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6'>
        <button
        className='absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2'
        onClick={()=>setLightBox('')}
        >
          <X/>
        </button>
        <img src={lightBox} className='max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain' />
      </div>
    }
    </div>
  )
}

export default MessageBubble