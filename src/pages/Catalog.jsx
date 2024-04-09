import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/api'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'
const Catalog = () => {
    const {catalogName} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true)
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase())[0]._id;
            
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            setLoading(true)
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                if (res.success) {
                    setCatalogPageData(res);
                }
                else{
                    setCatalogPageData(null)
                }
                setLoading(false)
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);
  return (
    <div className='text-white flex flex-col'>
        <div className='flex flex-col p-12 gap-4 bg-richblack-500'>
            <p>{`Home/catalog/`}
            <span className='text-yellow-100'>
            {catalogPageData?.data?.selectedCategory?.name}
            </span></p>
            <p className='text-5xl'>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p className='text-xl'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
        <div className='flex flex-col px-12 mt-5'>
            <div className='mb-10'>
                <div className='flex gap-x-3 text-xl mb-7'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/>
            </div>
            <div className='mb-10'>
                <p className='text-4xl mb-7'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/>
                </div>
            </div>
            <div>
                <p className='flex gap-x-3 text-4xl mb-7'>Frequently bought</p>
                <div>
                    <div className='grid grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course,index)=>(
                                <Course_Card course={course} key={index} Height={"h-[400px]"} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Catalog