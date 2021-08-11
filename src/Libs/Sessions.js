import Storage from './Storage';
export var driver = false;
export var name = '';
var id = '';
export var token = '';
export var username = '';
export var mypassenger = {};

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
        await Storage.instance.store(key, response.token);

        key = `data-${response.user.username}`;
        await Storage.instance.store(key, JSON.stringify(response.user));

        key = `driver-${response.user.username}`;
         await Storage.instance.store(
          key,
          JSON.stringify(response.driver),
        );

        id = response.user.profile;
        id = JSON.stringify(id)
        token = response.token;
        await Storage.instance.store('token', token)
        await Storage.instance.store('id', id)
        name = response.user.first_name;
        username = response.user.username;
        driver = response.driver
          if(driver){
            await Storage.instance.store('isDriverLogCheck', 'true')
          }else{
            await Storage.instance.store('isDriverLogCheck', 'false')
          }
        
        return true;
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
  signupCar = async body => {
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/driver/car/0/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      //let response = await request.json();
      //console.log(response);
      /* if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      } */
    } catch (err) {
      console.log('car err', err);
      throw Error(err);
    }
  };

  SignupPayment = async body => {
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/driver/payment/${id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      //let response = await request.json();
      //console.log(response);
      /* if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      } */
    } catch (err) {
      console.log('payment err', err);
      throw Error(err);
    }
  };

  signupData = async body => {
    //console.log(token, id)
    token2 = await Storage.instance.get('token')
    //console.log(token2)
    try {
      let _body = body
      _body.postal_code = parseInt( _body.postal_code)
      _body.internal_number = parseInt( _body.internal_number)
      _body.external_number = parseInt( _body.external_number)
      body = _body
      //console.log(body)
      //console.log(token, id)
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/profile/${id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Token ${token}`,
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
      console.log('get info err', err);
      throw Error(err);
    }
  };

  getUser = async () => {
    try {
      id = await Storage.instance.get('id')
      token = await Storage.instance.get('token')
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/profile/${id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token '+ token,
          },
        },
      );
      let response = await request.json();
      return response
    } catch (err) {
      console.log('Geting user info error', err);
      throw Error(err);
    }
  };

  getToken = async username => {
    try {
      const key = `token-${username}`;
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

getBalance = async () => {
  try {
    let request = await fetch(
      `https://carpool-arduino-backend.herokuapp.com/getUser/?user_id=${username}`,
      {
        method: 'GET',
      },
    );
    let response = await request.json();
    console.log("the balance is: ")
    console.log(response);
  } catch (err) {
    console.log('get balance err', err);
    throw Error(err);
  }

  deletePassengerRelation = async passenger_id => {
    token = await Storage.instance.get('token');
    console.log(passenger_id);
    try {
      let request = await fetch(
        `https://carpool-utch.herokuapp.com/driver/passengers/${passenger_id}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );

      let response = await request.json();
      console.log(response)
    } catch (err) {
      
      console.log('Delete passenger relation err', err);
      throw Error(err);
    }
  };
  /* try {
    //https://carpool-arduino-backend.herokuapp.com/
    const key = `token-${username}`;
    return await Storage.instance.get(key);
  } catch (err) {
    console.log('Get token error', err);
  } */
};

export default UserSession;