
import Layout from "@/components/layout/Layout";
import NextImage from "@/components/NextImage";

type QuotePageProps = {
  data: {
    name: string
  }
}


import axios from 'axios';
import { ErrorMessage,Field, FieldArray, FieldProps, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  subject: string;
  message: string;
  howDidYouHear: string;
  interests: string[];
  budget: string;
  tastes: string[],
  projectType: string
  projectDescription: string
  images: File[];
}


const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


const interests = [
  'Option 1', 'Option 2', 'Option 3', // Replace with your options
];

const budgets = [
  '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+', // Replace with your options
];



const tastes = [
  'Option 1', 'Option 2', 'Option 3', // Replace with your options
]



const projectType = [
  'Option 1', 'Option 2', 'Option 3', // Replace with your options
]



const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const areaCode = phoneNumber.slice(0, 3);
  const firstPart = phoneNumber.slice(3, 6);
  const secondPart = phoneNumber.slice(6, 10);

  if (phoneNumber.length <= 3) {
    return areaCode;
  } else if (phoneNumber.length <= 6) {
    return `(${areaCode}) ${firstPart}`;
  } else {
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }
};


const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  subject: '',
  howDidYouHear: '',
  message: '',
  interests: [],
  budget: '',
  tastes: [],
  projectType: '',
  projectDescription: '',
  images: []

}

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$$/


const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  address: Yup.object().shape({
    address: Yup.string().required('Required'),
    addressLine2: Yup.string(), // optional
    city: Yup.string().required('Required'),
    state: Yup.string()
      .oneOf(states, 'Invalid state')
      .required('Required'),
    zipCode: Yup.string().matches(/^\d{5}$/, 'Must be exactly 5 digits').required('Required'),
  }),
  interests: Yup.array().of(Yup.string().oneOf(interests, 'Invalid choice').required('Required')),
  budget: Yup.string().oneOf(budgets, 'Invalid choice').required('Required'),
  tastes: Yup.string().oneOf(tastes, 'Invalid choice').required('Required'),
  projectType: Yup.string().required('Required'), 
  projectDescription: Yup.string().required('Required'), 
  images: Yup.array()
    .test(
      'fileSize',
      'File size too large',
      value => value && value.length > 0 && value.every((file: File) => file.size <= 1048576) // 1MB
    )
    .test(
      'fileType',
      'Unsupported File Format',
      value => value && value.length > 0 && value.every((file: File) => ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type))
    ),

});



const FormSection: React.FC = () => {

  const customImgLoader = ({ src }: {src: string}) => {
     return `${src}`
  }

  return (
    <div className="w-full">
      <div className=" pt-16 flex flex-col w-full justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            const formData = new FormData();
            for (let i = 0; i < values.images.length; i++) {
              formData.append(`images${i}`, values.images[i]);
            }
          
            // append other form data
            Object.keys(values).forEach((key) => {
              if (key !== 'images') {
                formData.append(key, values[key]);
              }
            });
          
            axios.post('/your/api/endpoint', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
          
            actions.setSubmitting(false);
          }}
          
        >
          {({ errors, touched, values }: FormikProps<FormValues>) => (
            <Form className="w-full font-secondary">

              <h2 className="text-3xl font-normal font-secondary text-center w-ufll flex justify-center items-center ">ABOUT YOU</h2>
              <div id="line" className="h-[0.5px] w-full bg-gray-600 mt-2 mb-12"></div>

              <div className='flex flex-row space-x-4 w-full'>

                <div className="mb-4 w-1/2">
                  <label className="block w-1/2  text-sm font-bold mb-2 px-2" htmlFor="firstName">
                    First Name
                  </label>
                  <Field className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" placeholder="John" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block w-1/2  text-sm font-bold mb-2 px-2" htmlFor="lasttName">
                    Last Name
                  </label>
                  <Field className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" placeholder="Doe" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="flex flex-row space-x-4">


                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="email">
                    Email
                  </label>
                  <Field className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="john@doe.com" type="email" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>


                {/* Phone Number field */}
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    render={({ field, form }: FieldProps<any>) => (
                      <input
                        {...field}
                        className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Phone Number"
                        value={formatPhoneNumber(field.value)}
                        onChange={(e) => {
                          const formattedValue = formatPhoneNumber(e.target.value);
                          form.setFieldValue('phoneNumber', formattedValue);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>


              </div>

              {/* Address field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 px-2" htmlFor="address">
                  Address Line 1
                </label>
                <Field
                  className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              {/* Address Line 2 field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 px-2" htmlFor="addressLine2">
                  Address Line 2
                </label>
                <Field className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="addressLine2" name="addressLine2" placeholder="Address Line 2" type="text" />
                <ErrorMessage name="addressLine2" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              {/* State field */}
              <div className="flex flex-row space-x-4">
                {/* City field */}
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="city">
                    City
                  </label>
                  <Field className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" name="city" placeholder="City" type="text" />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Zip Code field */}
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="zipCode">
                    Zip Code
                  </label>
                  <Field className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="zipCode" name="zipCode" placeholder="Zip Code" type="text" />
                  <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                </div>

              </div>
              <div className="mb-4 w-1/2 pr-2 relative">
                <label className="block text-sm font-bold mb-2 px-2" htmlFor="state">
                  State
                </label>
                <Field
                  as="select"
                  className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  name="state"
                  placeholder="State"
                >
                  <option value="" disabled hidden>
                    Select a state
                  </option>
                  {states.map((state, id) => (<option value={state} key={id}>{state}</option>))}
                </Field>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"> 
                
                {/* Added this div for the icon */}
                  <svg className="fill-current h-8 text-gray-500 translate-y-1/2 -translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.454 6.321l4.546 4.978 4.546-4.978.894.894-5.44 5.982-5.44-5.982z"/>
                  </svg>
                </div>

                <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              <h2 className="text-3xl font-normal font-secondary text-center w-ufll flex justify-center items-center mt-24">ABOUT YOUR PROJECT</h2>
              <div id="line" className="h-[0.5px] w-full bg-gray-600 mt-2 mb-12"></div>
                                  
                {/* Interests field */}
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="interests">
                    What are you interested in?
                  </label>
                  {interests.map((interest, id) => (
                    <div className="flex px-2 space-x-2 flex-row items-center text-sm" key={id}>
                      <Field type="checkbox" id={`interests.${id}`} name="interests" value={interest} />
                      <label htmlFor={`interests.${id}`}>{interest}</label>
                    </div>
                  ))}
                  <ErrorMessage name="interests" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                  
                {/* Budget field */}
                <div className="mb-4 lg:w-1/2 w-full pr-2 relative">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="budget">
                    How much would you like to invest in your project?
                  </label>
                  <Field
                    as="select"
                    className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="budget"
                    name="budget"
                  >
                    <option value="" disabled hidden>
                      Select your budget
                    </option>
                    {budgets.map((budget, id) => (
                      <option value={budget} key={id}>{budget}</option>
                    ))}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"> 
                    <svg className="fill-current h-8 text-gray-500 translate-y-1/2 -translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.454 6.321l4.546 4.978 4.546-4.978.894.894-5.44 5.982-5.44-5.982z"/>
                    </svg>
                  </div>
                  <ErrorMessage name="budget" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                
                {/* tastes field */}
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="tastes">
                    What are your design tastes and style?
                  </label>
                  {tastes.map((taste, id) => (
                    <div className="flex px-2 space-x-2 flex-row items-center text-sm" key={id}>
                      <Field type="checkbox" id={`tastes.${id}`} name="tastes" value={taste} />
                      <label htmlFor={`tastes.${id}`}>{taste}</label>
                    </div>
                  ))}
                  <ErrorMessage name="tastes" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="projectType">
                    Work to be completed in:
                  </label>
                  {projectType.map((project, id) => (
                    <div className="flex px-2 space-x-2 flex-row items-center text-sm" key={id}>
                      <Field type="radio" id={`projectType.${id}`} name="projectType" value={project} />
                      <label htmlFor={`projectType.${id}`}>{project}</label>
                    </div>
                  ))}
                  <div className="flex px-2 space-x-2 flex-row items-center text-sm">
                    <Field type="radio" id='projectType.other' name="projectType" value='Other' />
                    <label htmlFor="projectType.other">Other</label>
                  </div>
                  
                  <Field
                    className="mt-2 shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="projectType.otherDesc"
                    name="projectTypeo.otherDesc"
                    placeholder="Other"
                    type="text"
                    disabled={values.projectType !== 'Other'}
                  />
                  <ErrorMessage name="projectType" component="div" className="text-red-500 text-sm mt-1" />
                </div>


                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2 px-2" htmlFor="projectDescription">
                    Describe your project:
                  </label>
                  <Field
                    as="textarea"
                    className="shadow appearance-none border h-52  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="projectDescription"
                    name="projectDescription"
                    placeholder="Describe your project here..."
                  />
                  <ErrorMessage name="projectDescription" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <FieldArray
                    name="images"
                    render={({ push }: any) => (
                      <div>
                        <label className="block text-sm font-bold mb-2 px-2" htmlFor="images">
                          Upload images for your project
                        </label>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(event) => {
                            const files = event.currentTarget.files;
                            if (files) {
                              for (let i = 0; i < files.length; i++) {
                                push(files[i]);
                              }
                            }
                          }}
                        />


                      </div>
                    )}
                  />
                  <div className="flex flex-wrap mt-4">
                    {values.images.map((file: File, index: number) => {
                      const blob = new Blob([file], {type: 'image/*'})
                      const blobUrl = URL.createObjectURL(blob);
                      console.log(blobUrl)
                      return (
                        <div key={index} className="mr-2 mb-2">
                          <NextImage
                            unoptimized
                            loader={customImgLoader}
                            src={blobUrl}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            width={250}
                            height={250}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <ErrorMessage name="projectImage" component="div" className="text-red-500 text-sm mt-1" />
                </div>
 

              <div className="flex flex-row w-full justify-center">

              <button
                type="submit"
                className="bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="reset"
                className="ml-4 bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>


              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};



export default function QuotePage({ data }: QuotePageProps) {
  return (
    <Layout>
      <div className=" pt-24 px-10 md:px-32 lg:px-72 dirtpattern pb-28">
        <h1 className="text-6xl font-normal font-secondary text-center w-ufll flex justify-center items-center ">BUILD YOUR PROJECT</h1>
        <p className="text-gray-600 mt-12 mb-12">We are excited to meet you and see your landscape project. We know that your time is extremely valuable. In order to streamline the process, we ask that you fill out this short questionnaire to help us get better acquainted. Speaking of the process, after we have a chance to review this information, we will contact you by phone to discuss the details. However just to be clear, working with us is a little like custom ordering furniture. Depending on the time of year, we are typically booked out anywhere from 6-10 weeks. But we are worth the wait! We use high quality plants and materials; our design team is creative and knowledgeable; and our installation crews are professional, hard working and proficient at their jobs. We also want to remind you that having new landscape plantings installed does create additional work for the homeowner. Care, watering and weeding of the new plantings is an important part of the whole process. So even though we will take care of the heavy lifting, be prepared to get your hands dirty and wet too. Thank you and we look forward to seeing you soon!</p>
        <FormSection />
      </div>
    </Layout>
  )
}



// export async function getStaticProps() {
//   const resData = axios.get("")
//   const data = (await resData).data.data

//   return {
//     data
//   }
// }

