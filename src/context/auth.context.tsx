import firebase from "firebase";
import { createContext, PropsWithChildren, useReducer } from "react";

interface AuthState {
  user: firebase.UserInfo;
  dispatch: (action: AuthAction) => void;
  signIn: () => void;
  signOut: () => void;
}

interface AuthAction {
  type: string;
  payload: firebase.UserInfo;
}


const initialState = {
  user: {
    providerId: '',
    uid: '',
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null
  },
  dispatch(action: AuthAction) {},
  signIn() {},
  signOut() {}
};

const Auth = createContext<AuthState>(initialState);

function reducer(state: firebase.UserInfo, action: AuthAction): firebase.UserInfo {
  switch (action.type) {
    case 'signin':
    case 'signout':
      return action.payload;
    default:
      throw new Error('Invalid action type');
  }
}

function AuthProvider({ children }: PropsWithChildren<object>) {
  const [user, dispatch] = useReducer(reducer, {
    providerId: firebase.auth().currentUser?.providerId ?? '',
    uid: firebase.auth().currentUser?.uid ?? '',
    displayName: firebase.auth().currentUser?.displayName ?? '',
    email: firebase.auth().currentUser?.email ?? '',
    phoneNumber: firebase.auth().currentUser?.phoneNumber ?? '',
    photoURL: firebase.auth().currentUser?.photoURL ?? '',
  });

  async function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().useDeviceLanguage();
    try {
      const response = await firebase.auth().signInWithPopup(provider);
      if (response.user) {
        dispatch({
          type: 'signin',
          payload: {
            providerId: response.user.providerId,
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            phoneNumber: response.user.phoneNumber,
            photoURL: response.user.photoURL
          }
        });
      }
    } catch (e) {
      throw new Error('Login failed.Please try again.');
    }
  }

  async function signOut() {
    await firebase.auth().signOut();
    dispatch({
      type: 'signout',
      payload: {
        providerId: '',
        uid: '',
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null
      }
    });
  }

  let value = { user, dispatch, signIn, signOut };

  return (
    <Auth.Provider value={value}>
      {children}
    </Auth.Provider>
  );
}

const AuthConsumer = Auth.Consumer;

export {
  Auth,
  AuthConsumer,
  AuthProvider
};
