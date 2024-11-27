import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function Mypost() {
  

  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const isDarkMode = useSelector((state) => state.theme.themeMode === "dark");

 // const isAuthor = posts && userData ? posts.userId === userData.$id : false;
 const isAuthor = posts.filter((post) => (post.userId === userData?.$id ? true : false));
  console.log("isAuthor",isAuthor)
  

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return isAuthor && isAuthor.length > 0 ? (
      <div className="w-full min-h-screen flex  gap-4 p-4">
      <Container className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 p-4 flex justify-center items-center ">
        <div className="w-full aspect-video overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>
        </div>
         
         <div className="w-full md:w-2/3 border rounded-xl">
         <h1 className={`text-center text-2xl font-bold text-purple-300 p-2
          ${isDarkMode ? "text-purple-300" : "text-textLightp"}
          `}>Your posts</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {isAuthor.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard {...post} className="h-full"/>
            </div>
          ))}
        </div>
        </div>
       
      </Container>
      </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <Container>
      <div className="w-2/4 sm:mt-20 ">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>
        <h1 className={`text-2xl font-bold text-slate-900 cursor-pointer
          ${isDarkMode ? "text-blue-400" : "text-textLightp"}
           `}>
          You have no posts
        </h1>
      </Container>
    </div>
  )

}

export default Mypost;
