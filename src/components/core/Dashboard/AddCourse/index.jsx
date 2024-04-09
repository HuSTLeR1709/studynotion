import RenderStpes from "./RenderStpes";


export default function AddCourse() {
    return (
        <div className="text-white w-full">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-4xl">Add Course</h1>
                    <div>
                        <RenderStpes/>
                    </div>
                </div>
                <div className="w-2/6 border-[1px] p-7 bg-[#161D29] text-[#F1F2FF] rounded-md border-[#2C333F] max-h-[390px] overflow-hidden">
                    <p className="text-xl mb-3 font-semibold">Course Upload Tips</p>
                    <ul className="flex flex-col gap-2 list-disc text-sm">
                       <li>Set the Course Price option or make it free.</li> 
                       <li>Standard size for the course thumbnail is 1024x576.</li>
                       <li>Video section controls the course overview video.</li>
                       <li>Course Builder is where you create & organize a course.</li>
                       <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                       <li>Information from the Additional Data section shows up on the course single page.</li>
                       <li>Make Announcements to notify any important</li>
                       <li>Notes to all enrolled students at once.</li>
                    </ul>
                    
                </div>
               
            </div>
        </div>
    )
}