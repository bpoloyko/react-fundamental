export const selectUserName = (state) => state.userReducer.name;

export const selectIsLoggedIn = (state) => state.userReducer.isAuth;
