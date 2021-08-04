import Storage from './Storage';
export var token = '';
export var id = 0;
export var full_name='';

class UserSession {
  static instance = new UserSession();

  login = async body => {
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/users/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      try {
        let key = `token-${response.user.username}`;
        token = response.token;
        id = response.user.profile.id +1;
        
        full_name = response.first_name
        

        await Storage.instance.store(key, response.token);
        console.log(id, token);
        return response.user.username;
      } catch (err) {
        return response;
      }
    } catch (err) {
      console.log('Login error', err);
      throw Error(err);
    }
  };

  logout = async key => {
    try {
      await Storage.instances.remove(key);
      return true;
    } catch (err) {
      console.log('logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/users/signup/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };
  signupDriver = async body => {
    try {
      let request = await fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };
  signupPassenger = async body => {
    try {
      let request = await fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  signupData = async body => {
    try {
      let request = await fetch(`https://carpool-utch.herokuapp.com/profile/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          
          Authorization: 'Token' + token
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  getToken = async key => {
    try {
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

export default UserSession;
