import React from 'react'

const Login = () => {
  return (
    <div className="form_container">
        <div className='form_wrapper'>
            <span className="logo">Pixel Palz</span>
            <img className='login_avatar' src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'/>
            <form>
                <input type='text' placeholder='Username'></input>
                <input type='password' placeholder='Password'></input>
                <button>Log in</button>
            </form>
            <p>Don't have an account? Sign up</p>
        </div>
    </div>
        
  )
}

export default Login