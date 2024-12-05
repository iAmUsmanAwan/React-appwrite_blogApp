import React, {useCallback} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"

//* this is the most important form because it uses almost everything that we have built so far

export default function PostForm({ post })
    {
        const {register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({      //? this will duplicate the post
            defaultValues: {
                tittle: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        });

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);

    const submit = async(data) => {

        // if (post) {
        //     const file = data.image[0] ? await appwriteSerice.uploadFile(data.image[0]) : null

        //     if (file) {     //? if we already have the post
        //         appwriteSerice.deleteFile(post.featuredImage)
        //     }
        //     const dbPost = await appwriteSerice.updatePost(post.$id, {
        //         ...data,
        //         featuredImage: file ? file.$id : undefined 
        //     })
        //     if (dbPost) {
        //         navigate(`/post/${dbPost.$id}`)
        //     }
        // } else {      //? if we are uploading a fresh post
        //     const file = await appwriteSerice.uploadFile(data.image[0])
        //     if (file) {
        //         const fileId = file.$id
        //         data.featuredImage = fileId
        //         const dbPost = await appwriteSerice.createPost({...data, userId: userData.$id})

        //         if (dbPost) {
        //             navigate(`/post/${dbPost.$id}`)
        //         }
        //     }
        // }


        try {
            let fileId;
            if (data.image[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                fileId = file?.$id;
                if (post?.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            }

            const dbPost = post
                ? await appwriteService.updatePost(post.$id, { ...data, featuredImage: fileId })
                : await appwriteService.createPost({ ...data, featuredImage: fileId, userId: userData.$id });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Error in submission:", error);
            // Display an error notification to the user
        }
    }

    const slugTransform = useCallback((value) => {     //? to create slug from the title
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")    //* regular expression
    }, [])

    React.useEffect(() => {    //? here watch is used which can read and also output that value from one section to another section
        watch((value, {name}) => {
            if (name === "title") 
                {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
                }
        }) 
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}     //? we have to register input inside the hooks so that they are available as values  (...register)
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}


                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {   //? this input field is setting some values
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                // {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

                />
                <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>

            <div className="1/3 px-2">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"     //? what type of data to accept 
                {...register("image", {required: !post})}
                />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}


                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteSerice.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-lg"
                        />
                    </div>

                )}
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", {required: true})}
                />
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}


                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                >{post ? "Update": "Submit"}     {/* if the post is there then we will update it otherwise we will submit it */}
                </Button>     
            </div>
        </form>
    )
}


//? how we have done 

//  upload the files first 
//  create helpers for them 
//  upload the file 
//  get back the url of the file 
//  set your object properly
//  use helper files to upload the file 
//  create the files
//  create the post

