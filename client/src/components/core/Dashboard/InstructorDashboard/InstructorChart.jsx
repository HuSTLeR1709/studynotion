import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {
    const [currChart , setCurrChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`
            colors.push(color)
        }

        return colors;  
    }

    const chartDataForStudents = {
        labels: courses.map((courses)=>courses.courseName),
        datasets:[
            {
                data: courses.map((course)=> course.totalStudentEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    const chartDataForIncome = {
        labels: courses.map((course)=>course.courseName),
        datasets:[
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    const options = {

    };
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p>Visualise</p>
        <div className="space-x-4 font-semibold">
            <button
            onClick={()=>setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
            >
                Student
            </button>
            <button
            onClick={()=>setCurrChart("income")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
            >
                Income
            </button>
        </div>
        <div className="relative mx-auto aspect-square h-full w-full">
            <Pie
                data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart