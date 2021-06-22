import React, { useState } from 'react';
import { useFormik } from 'formik';
import Email from "./Email"


const SignupForm = () => {


  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    errors.emailArr = [];
    values.emailArr.forEach((item, index) => {

      if (!item.email) {
        errors.emailArr[index] = { email: "required" }
      }
    });

    if (errors && errors.emailArr.length === 0) {
      delete errors.emailArr;
    }
    return errors;
  };

  // const [emailArr, setEmailArr] = useState([{ email: "" }])
  let { handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting, dirty, handleChange, setValues } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      emailArr: [{ email: "" }]
    },
    validate,
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = data.json();
    },
  });
  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
      />
      {touched.firstName && errors.firstName ? (
        <div>{errors.firstName}</div>
      ) : null}

      <br />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
      />
      {touched.lastName && errors.lastName ? (
        <div>{errors.lastName}</div>
      ) : null}

      <br />

      {values.emailArr.map((item, index) => <Email key={index} index={index} handleBlur={handleBlur}
        item={item}
        touched={touched}
        errors={errors} handleChange={handleChange} />)}

      {console.log({ isSubmitting })}


      <button disabled={!(isValid && dirty) || isSubmitting} type="submit">{isSubmitting ? "Submittng..." : "Submit"}</button>
      <button type="button" onClick={() => {
        const newValue = { ...values, emailArr: [...values.emailArr, { email: "" }] }
        setValues(newValue)
      }}>++</button>
    </form>
  );
};

export default SignupForm