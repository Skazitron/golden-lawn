import axios from 'axios';
import { ErrorMessage,Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  subject: string;
  message: string;
  howDidYouHear: string;

}


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
  address: '',
  subject: '',
  howDidYouHear: '',
  message: '',
};

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$$/


const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  address: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
  howDidYouHear: Yup.string(),
});

const MyForm: React.FC = () => {
  return (
    <div className="lg:grid lg:grid-cols-2  flex flex-col w-full bg-brown text-bg px-12 md:px-24 pb-16">
      <div className='pt-16 flex flex-col md:items-start items-center md:text-left text-center'>
        <h2>Get in Touch with Our Expert&nbsp;<span className='text-fg'>Landscapers!</span></h2>
        <div className='text-gray-300 mt-6 mb-6'>
        We're here to bring your outdoor dreams to life. Whether you need a stunning garden makeover, regular lawn maintenance, or professional tree services, our skilled team is ready to help. Simply fill out the form, and we'll get back to you promptly. We look forward to transforming your landscape!
        </div>
        <div className='flex flex-col justify-start items-center'>
          <h3>Office Hours:</h3>
          <ul className='mb-12 py-3'>
            <li>Sunday: 8AM-9PM</li>
            <li>Sunday: 8AM-9PM</li>
            <li>Sunday: 8AM-9PM</li>
            <li>Sunday: 8AM-9PM</li>
            <li>Sunday: 8AM-9PM</li>
            <li>Sunday: 8AM-9PM</li>
          </ul>
        </div>
        <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d767305.2741022076!2d-86.32752174197957!3d41.30263651847676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x670cbb7c26699%3A0xf125bfed6ebec3c1!2sGolden%20Gates%20Lawn%20Care%20%26%20Landscaping%20LLC!5e0!3m2!1sen!2sus!4v1688214873048!5m2!1sen!2sus" 
                width="100%"
                className=' min-h-[300px] md:h-[400px]'
                style={{border:0}}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div className=" pt-16 flex flex-col w-full justify-center items-center">
        <h2 className='mb-8'>Contact Us</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            axios.post(JSON.stringify(values, null, 2)).then((response) => console.log(response)).catch((error) => console.log(error));
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }: FormikProps<FormValues>) => (
            <Form className="">
              <div className='flex flex-row space-x-4 w-full'>

                <div className="mb-4">
                  <label className="block  text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" placeholder="John" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block  text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" placeholder="Doe" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>


              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="john@doe.com" type="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              {/* Phone Number field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  render={({ field, form }: FieldProps<any>) => (
                    <input
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

              {/* Address field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {/* Subject field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <Field
                  as="select"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                >
                  <option value="" disabled hidden>
                    Select a subject
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                  <option value="Option 4">Option 4</option>
                  <option value="Option 5">Option 5</option>
                  <option value="Option 6">Option 6</option>
                  <option value="Option 7">Option 7</option>
                  <option value="Option 8">Option 8</option>
                </Field>
                <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/** Message field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <Field
                  className="h-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  placeholder="Message"
                  type="message"
                  component="textarea"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* How did you hear about us field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="howDidYouHear">
                  How did you hear about us? (Optional)
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="howDidYouHear"
                  name="howDidYouHear"
                  placeholder="How did you hear about us?"
                  type="text"
                />

                <ErrorMessage name="howDidYouHear" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="reset"
                className="ml-4 bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyForm;
