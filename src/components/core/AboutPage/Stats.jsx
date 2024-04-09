import React from 'react'




const Stats = [
    { count: "5k" , lable: "Active Students"},
    { count: "10+" , lable: "Mentors"},
    { count: "100+" , lable: "Courses"},
    { count: "50+" , lable: "Awards"},
]
const StatsComponent = () => {
  return (
    <section>
        <div className='mt-12'>
            <div className='flex font-bold justify-around text-center bg-richblack-600 p-10'>
                {
                    Stats.map((data,index)=> {
                        return <div className='flex flex-col gap-2' key={index}>
                            <h1 className='text-center text-3xl text-white'>{data.count}</h1>
                            <h2 className='text-center text-richblack-300'>{data.lable}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent