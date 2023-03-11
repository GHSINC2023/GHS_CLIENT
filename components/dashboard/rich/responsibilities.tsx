import dynamic from 'next/dynamic';
import React from 'react'
const ReactQuill = dynamic(() => import("react-quill"))
import 'react-quill/dist/quill.snow.css';


const toolBarOption = [
    [ 'bold' ],
    [ { 'list': 'bullet' } ],
]

export default function Responsibilities({ value, setValue, data }: any) {

    return (
        <div>
            <ReactQuill theme="snow" value={value} onChange={setValue}
                modules={{
                    toolbar: toolBarOption,
                }}
            />
        </div>
    )
}
