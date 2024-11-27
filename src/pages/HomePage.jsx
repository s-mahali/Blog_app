import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function HomePage() {
  const [posts, setPosts] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.themeMode === "dark");

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
     
     
      <div className="w-full py-4 md:py-8 mt-2 md:mt-4 text-center relative">
     
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 ">
            <div className="w-full md:w-auto mb-4 md:mb-0 ">
              <img 
                src="https://i.ibb.co/5BCcDYB/Remote2.png" 
                alt="Remote work illustration"
                className="max-w-full h-auto md:max-w-md"
              />
            </div>
            
            <Link 
              to="/login"
              className="w-full md:w-auto flex justify-center"
            >
              <div className="relative inline-block ">
                <h1
                  className={`text-lg md:text-xl font-bold cursor-pointer p-1 duration-200 
                    hover:text-blue-400 hover:scale-105 pr-8
                    ${isDarkMode ? "text-textDarkp" : "text-textLightp"}`}
                >
                  Sign In to Create and Read posts 🫡
                  <ArrowRight
                    className="w-6 h-6 md:w-7 md:h-7 text-blue-700 absolute top-1/2 -translate-y-1/2 right-0"
                    strokeWidth={2}
                  />
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
    
    );
  }
  return (
    <div className="w-full py-8 relative">
      
      <Container>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="w-full p-2 ">
              <PostCard className="h-full" {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
   
  );
}

export default HomePage;
