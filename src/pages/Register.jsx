import React from 'react'

const Register = () => {
  return (
    <div className="form_container">
        <div className='form_wrapper'>
            <span className="logo">Pixel Palz</span>
            <span className="title">Register</span>
            <form>
                <input type='text' placeholder='Username'></input>
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button>Sign up</button>
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
        
  )
}

export default Register