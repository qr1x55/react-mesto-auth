class Api {
  constructor(data){
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._token = this._headers.authorization;
  }

  _responseHandler(res) {return res.ok ? res.json() : Promise.reject()}

  _request(postUrl, options) {
    return fetch(`${this._baseUrl}${postUrl}`, options).then(this._responseHandler)
  }

  getInfo() {
    return(
      this._request('/users/me', {
        headers: {
          authorization: this._token
        }
      }) 
    )
  }

  getInitialCards() {
    return(
      this._request('/cards', {
        headers: {
          authorization: this._token
        }
      })
    )
  }

  setUserData(data) {
    return(
      this._request('/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.editName,
          about: data.editJob
        })
      })
    )
  }

  setAvatar(data) {
    return(
      this._request('/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
    )
  }

  postCard(data) {
    return(
      this._request('/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
    )
  }

  setLike(cardId) {
    return(
      this._request(`/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
    )
  }

  removeLike(cardId) {
    return(
      this._request(`/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
    )
  }

  removeCard(cardId) {
    return(
      this._request(`/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
    )
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '708b7ef6-8216-41c4-8e3e-5a22a25b5a61',
    'Content-Type': 'application/json'
  }
});

export default api