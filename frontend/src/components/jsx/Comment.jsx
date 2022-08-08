import React from 'react'
import "../css/CommentStyles.css"

const Comment = (props) => {
const {review,user,date} = props

  return (
  <div className="Comment">
    <div className="Comment-Poster">
      <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="User" />
      <div className="Comment-Poster-Details">
        <div className='Comment-Poster-name'>{user}</div>
        <div className="Comment-Post-Time">{date}</div>
        <hr />
        <div className="Comment-Poster-comment">{review}</div>
      </div>
    </div>
  </div>
  )
}

export default Comment