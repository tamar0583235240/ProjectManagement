// // /src/app/api/userApi.ts
// import { api } from "@/app/api"; // בסיס ה-RTK Query שלך
// import type { SetPasswordRequest } from "../../types/SetPasswordRequest";

// /**
//  * userApi - מודול שמאגד את כל קריאות ה-API שקשורות למשתמשים.
//  * כאן מגדירים קריאות להוספת משתמש, משיכת ראשי צוות, ועדכון סיסמה בתהליך בחירת סיסמה.
//  */
// export const userApi = api.injectEndpoints({
//   endpoints: (build) => ({
    
//     /**
//      * addUser - הוספת עובד או ראש צוות על ידי המנהל.
//      * שולח בקשה מסוג POST לשרת עם פרטי המשתמש (מייל, תפקיד, מנהל עליו תלוי, ארגון).
//      * השרת ישלח מייל הזמנה עם טוקן לבחירת סיסמה.
//      */
//     addUser: build.mutation({
//       query: (body) => ({
//         url: "/users/invite",
//         method: "POST",
//         body,
//       }),
//     }),

//     /**
//      * getTeamLeaders - משיכת רשימת ראשי צוות שקיימים תחת המנהל הנוכחי.
//      * בקשת GET לשרת, מחזיר מערך של משתמשים בתפקיד ראש צוות (role=team_leader)
//      * הכרחי כדי להציג סלקט דינמי בטופס הוספת עובד.
//      */
//     getTeamLeaders: build.query({
//       query: () => "/users/team-leaders",
//     }),

//     /**
//      * setPassword - עדכון שם משתמש וסיסמה בתהליך בחירת סיסמה לאחר קבלת הזמנה.
//      * מקבל טוקן חד-פעמי, שם משתמש וסיסמה חדשים, שולח POST לשרת לאימות הטוקן ולעדכון הסיסמה במסד.
//      * לאחר ההצלחה המשתמש יכול להתחבר למערכת עם הפרטים החדשים.
//      */
//     setPassword: build.mutation<void, SetPasswordRequest>({
//         query: ({ token, user_name, password }) => ({
//           url: `/users/set-password/${token}`,
//           method: "POST",
//           body: { user_name, password },
//         }),
//       }),

//   }),
// });

// // חוץ מההגדרה, מייצאים גם ה-hooks לשימוש בקומפוננטות React
// export const { 
//   useAddUserMutation, 
//   useGetTeamLeadersQuery, 
//   useSetPasswordMutation 
// } = userApi;
// services/userApi.ts
import { api } from "../../app/api"; // הבסיס של RTK Query שלך
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { SetPasswordRequest } from "../../types/SetPasswordRequest"; // סוג הבקשה לעדכון סיסמה
import type { User } from "../../types/User";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getTeamLeaders: builder.query<User[],string>({
        query: (managerId) => ({
            url: `user/getTeamLeaderNames/${managerId}`, 
            method: 'GET',
        }),
    }),
    signUp: builder.mutation<AddUserInputs, User>({
        query: (user) => ({
          url: "invite/inviteUser",
          method: "POST",
          body: user,
        }),
        invalidatesTags: ["User"],
      }),

 



    // setPassword: build.mutation<void, SetPasswordRequest>({
    //   query: ({ token, user_name, password }) => ({
    //     url: `/users/set-password/${token}`, // הנתיב שרת לקבלת set password
    //     method: "POST",
    //     body: { user_name, password }, // גוף הבקשה בלי הטוקן שב-URL
    //   }),
    // }),

    // addUser: build.mutation<
    //   void,
    //   { email: string; role: string; managerId?: string; organizationId: string }>({
    //   query: (body) => ({
    //     url: "/users/invite",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    
    // signIn: builder.mutation< User,SignInFormData>({
    //     query: (user) => ({
    //         url: 'auth/SignIn',
    //         method: "POST",
    //         body: user,
    //     }),
    //     invalidatesTags: ["User"],
    // }),
  }),
});

export const {  useGetTeamLeadersQuery } = userApi;
