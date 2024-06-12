import React from 'react'
import ContactForm from '../../ContactUsPage/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center mx-auto gap-4'>
        <h1 className='text-4xl font-bold'>Get in Touch</h1>
        <p className='text-richblack-100'>
        We’d love to here for you, Please fill out this form.
        </p>
        <div>
            <ContactForm/>
        </div>
    </div>
  )
}

export default ContactFormSection