import { useState, useEffect } from "react"
import api from "../utils/api";

export default function ButtonLike({myId, likes, cardId}) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.some(item => myId === item._id))
  }, [likes, myId])

  function handleLike() {
    if (isLiked) {
      api.removeLike(cardId)
        .then(res => {
          setIsLiked(false);
          setCount(res.likes.length);
        })
        .catch((error => console.error(`Ошибка при загрузке ${error}`)))
    } else {
      api.setLike(cardId)
        .then(res => {
          setIsLiked(true);
          setCount(res.likes.length);
        })
        .catch((error => console.error(`Ошибка при загрузке ${error}`)))
    }
  }

  return(
    <>
      <button type="button" className={`elements__like-button ${isLiked ? 'elements__like-button_active': ''}`} onClick={handleLike}/>
      <span className="elements__like-counter">{count}</span>
    </>
  )
}