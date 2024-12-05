import React from 'react'
import {Controller} from "react-hook-form"
import {Editor} from "@tinymce/tinymce-react"

//* Real Time Editor  (TinyMCE)
//? for this purpose TinyMCE is used

function RTE({
    name, control, label, defaultValue = ""
}) {

    //* Access the API key from environment variables
    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;  // Get API key from .env

    return (
    <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1'> {label}</label>
        }
        <Controller
        name={name || "content"}    //? default set to content
        control={control}
        defaultValue={defaultValue}  // Ensure default value is passed
        render={({field: {onChange, value}}) => (
            <Editor
            apiKey='qtbgqygyym3ge1iyd6pirieis90hezuz1pe6a4qwzb5z9uu8'
            value={value || defaultValue}     // Initialize with the current value or default
            init={{
                branding: false,
                height: 500,
                menubar: true,
                apiKey: apiKey,
                plugins: [      
                    //? same from the documentation of tinymce as needed
                    // Core editing features
                    'anchor', 
                    'autolink', 
                    'charmap', 
                    'codesample', 
                    'emoticons', 
                    'image', 
                    'link', 
                    'lists', 
                    'media', 
                    'searchreplace', 
                    'table', 
                    'visualblocks', 
                    'wordcount',
                    'checklist', 
                    'mediaembed', 
                    'casechange', 
                    'export', 
                    'formatpainter', 
                    'pageembed', 
                    'a11ychecker', 
                    'tinymcespellchecker', 
                    'permanentpen', 
                    'powerpaste', 
                    'advtable', 
                    'advcode', 
                    'editimage', 
                    'advtemplate', 
                    'mentions', 
                    'tableofcontents', 
                    'footnotes', 
                    'mergetags', 
                    'autocorrect', 
                    'typography', 
                    'inlinecss', 
                    'markdown',
                    // Early access to document converters
                    'importword', 
                    'exportword', 
                    'exportpdf'
                ],
                toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style: 
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newValue) => onChange(newValue)}  // Update the form value when editor changes
            />
        )}
        />
    </div>
    )
}

export default RTE