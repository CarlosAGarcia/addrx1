// For more help visit https://formspr.ee/react-help
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
 
export default function ContactForm() {
  const [state, handleSubmit] = useForm("moqbvyzn"); // CONTACT-LANDING form id
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className='formContent'>
        <div className='contentContainer'>
            <label htmlFor="email" className='emailText labelText'> EMAIL </label>
            <input
                id="email"
                type="email" 
                name="email"
                className='input emailInput'
            />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
            />
        </div>
        <div className='contentContainer inq'>

            <label htmlFor="message" className='helpText labelText'> HOW CAN WE HELP </label>
            <textarea
                id="message"
                name="message"
                className='input msgInput'
            />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
            />
            </div>

      </div>
      <div className='submitBtnContainer'>
        <button type="submit" className='submitButton' disabled={state.submitting}>
            SUBMIT
        </button>
      </div>
    </form>
  );
}