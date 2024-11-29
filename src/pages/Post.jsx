import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

function Post() {
  const [post, setPost] = useState(null);
  const [allPost, setAllPost] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.themeMode === "dark");

  const { slug } = useParams();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    appwriteService.getPosts([]).then((allPost) => {
      if (post) {
        setAllPost(allPost.documents || []);
      }
    });
  }, [post]);

  const otherPosts = allPost.filter((post) => post.$id !== slug);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        toast.success("Post deleted successfully");

        navigate("/");
      }
    });
  };

  let publishDate = new Date(post?.$createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  

  return post ? (
    <div
      className={`py-8 bg-gray-900 min-h-screen 
      ${isDarkMode ? "bg-gray-900" : "bg-slate-300"}
    `}
    >
      <Container>
        <div className=" flex flex-col lg:flex-row  gap-8 ">
          <div className="w-full lg:w-2/3 flex flex-col  gap-4 ">
            <div className="space-y-4">
              <h1
                className={`text-2xl font-bold px-3 md:text-3xl text-purple-300
                ${isDarkMode ? "text-purple-300" : "text-textLightp"}
              `}
              >
                {post.title}
              </h1>
              <p
                className={`px-3 text-sm md:text-base
              ${isDarkMode ? "text-textDarkp" : "text-textLightp"}
              `}
              >
                Publish Date: {publishDate}
              </p>
             
            </div>

            <div className="w-full md:w-4/5 mx-auto relative  rounded-xl p-2 overflow-hidden bg-gray-800">
              <img
                className=" w-full h-[200px] md:h-[400px] object-cover  rounded-xl"
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                loading="lazy"
              />

              {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      variant="secondary"
                      className="text-sm md:text-base hover:bg-white/90"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={deletePost}
                    className="text-sm md:text-base hover:bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div
              className={`browser-css w-full prose prose-sm md:prose-base  lg:prose-lg prose-invert max-w-none px-3
           ${isDarkMode ? "text-textDarkp" : "text-textLightp"}
            `}
            >
              {parse(post.content)}
            </div>
          </div>

          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div
              className={`lg:sticky lg:top-8 bg-gray-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm
               ${isDarkMode ? "bg-gray-800" : "bg-slate-500"}
            `}
            >
              <h3
                className={`text-xl md:text-2xl font-bold text-purple-300 mb-4 md:mb-6
             ${isDarkMode ? "text-purple-300" : "text-textLightp"}
              `}
              >
                Read other posts
              </h3>
              <div className="space-y-3">
                {otherPosts.map((post) => (
                  <Link
                    key={post.$id}
                    to={`/post/${post.$id}`}
                    className="group block"
                  >
                    <div className="flex items-center justify-between p-3 md:p-4 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <h4
                        className={`text-sm md:text-base flex-1 mr-2  
                      ${
                        isDarkMode
                          ? "text-textDarkp group-hover:text-purple-300"
                          : "text-gray-300 group-hover:text-purple-300"
                      }
                      `}
                      >
                        {post.title}
                      </h4>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
