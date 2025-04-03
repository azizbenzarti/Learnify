import React from "react";
import CourseInfo from "../components/Course/CourseInfo";
import ChapterList from "../components/Course/ChapterList";
export default function CourseContent() {
  return (
    <div className="w-screen h-screen overflow-y-auto">
      <div className="mx-auto max-w-screen-lg px-3 py-10">
        <CourseInfo />
        <div className="my-6 border-t-2 border-gray-300"></div>
        <div className="max-h-[80vh] overflow-y-auto">
          <ChapterList />
        </div>
      </div>
    </div>
  );
}
  
