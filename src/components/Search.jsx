import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a friend'/>
      </div>
      <div className="userChat">
        <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="" />
        <div className="userChatInfo">
          <span>Kinji</span>
        </div>
      </div>
    </div>
  )
}

export default Search