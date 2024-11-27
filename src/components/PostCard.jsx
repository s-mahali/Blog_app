import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ title, $id, featuredImage, className = "" }) {
   let isDarkMode = useSelector(state => state.theme.themeMode === "dark");
  return (
    <Link to={`/post/${$id}`}>
      <div
        className= {`w-full h-full rounded-xl p-4 duration-200
          hover:scale-105
           ${className}
        ${isDarkMode ? "bg-secDark" : "bg-secLight"}
        `}  
        
      >
        <div className="w-full aspect-video h-48 justify-center overflow-hidden  mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-full object-cover"
          ></img>
        </div>
        <h2 className={`text-xl font-bold text-center  
          ${isDarkMode ? "text-textDarkp" : "text-textLightp"}
          `}>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
