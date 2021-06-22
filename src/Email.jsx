import React from 'react'

function Email({ handleBlur, handleChange, values, touched, errors, index, item }) {
  return <>
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      name={`emailArr[${index}].email`}
      type="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values && values.emailArr[index] && values.emailArr[index].email}
    />
    {touched.emailArr && errors.emailArr && touched.emailArr[index] && touched.emailArr[index].email && errors.emailArr[index] && errors.emailArr[index].email ? (
      <div>{errors.emailArr && errors.emailArr[index] && errors.emailArr[index].email}</div>
    ) : null}
  </>
}

export default Email
