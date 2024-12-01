import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Inputindividual, RTE, Select } from "./index";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector,  } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  
  const userData = useSelector((state) => state.auth.userData);
  
  const userSubmit = async (data) => {
    
    if (post) {
      const file = data.image[0]
      
        ? await appwriteService.uploadFile(data.image[0])
        : null;
        
      if (file) {
        
        appwriteService.deleteFile(post.featuredImage);
        toast.success("Image Updated");
       
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
        
      });

      if (dbPost) {
         
        navigate(`/post/${dbPost.$id}`);
        toast.success("Post Updated successfully");
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
  
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
         
          navigate(`/post/${dbPost.$id}`);
          toast.success("Post Created successfully");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(userSubmit)}
      className="flex w-full flex-col md:flex-row"
    >
      <div className="md:w-2/3 px-2 w-full mb-6 md:mb-0">
        <RTE
          control={control}
          name="content"
          label={"Content: "}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="md:w-1/3 px-2 w-full">
        <div className="space-y-4">
          <Inputindividual
            label="Title:"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          <Inputindividual
            label="Slug:"
            placeholder="slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <div className="space-y-2">
            <Inputindividual
              label="FeaturedImage: "
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg/, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full  ">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg w-full object-cover max-h-48"
                />
              </div>
            )}
          </div>
          <Select
            options={["active", "inactive"]}
            label="status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" variant="primary" className="w-full">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
