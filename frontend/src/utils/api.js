class Api {
    // Универсальный, должен работать с любым API
    //constructor(config) {
        //this._url = config.url;
        //this._headers = config.headers;
    //}

    constructor({ url }) {
        this._url = url;
        //this._token = token;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
    }

    // Инфо о пользователе с сервера
    getInfoUser() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            //headers: this._headers
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
              //authorization: this._token,
              //authorization: token,
            }
        })
        .then(this.#onResponse)
    }
    
    // Начальные карточки с сервера
    getInitialCards() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            //headers: this._headers
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
                //authorization: token,
            }
        })
        .then(this.#onResponse)
    }

    getAllInfo() {
        return Promise.all([this.getInfoUser(), this.getInitialCards()])
    }

    // Редактирование профиля
    editProfile(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            //headers: this._headers,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this.#onResponse)
    }

    // Обновление аватара пользователя
    editAvatar(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            //headers: this._headers,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this.#onResponse)
    }

    // Удаление карточки
    removeCard(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            //headers: this._headers
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
            }
        })
        .then(this.#onResponse)
    }

    // Добавление карточки
    addCard(data) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            //headers: this._headers,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this.#onResponse)
    }

    // Лайкнуть карточку
    changeLike(cardId, isLiked) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            //headers: this._headers
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                //authorization: this._token,
            }
        })
        .then(this.#onResponse)
    }
}

//const configApi = {
    // url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    //headers: {
      //"Content-Type": "application/json",
      //authorization: '0523e71c-6164-4ff4-82c6-ca81e8bb5b70'
    //}
//}

//const api = new Api(configApi);

const api = new Api({
    url: 'http://localhost:3000',
    //url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    //token: '0523e71c-6164-4ff4-82c6-ca81e8bb5b70'
});

export default api;