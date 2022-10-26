import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

// type IFormData = {
//   errors: {
//     email: {
//       message: string;
//     };
//   };
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   extraErorr?: string;
// };
// function ToDoList() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IFormData>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IFormData) => {
//     if (data.password != data.confirmPassword) {
//       setError(
//         "confirmPassword",
//         { message: "Password does not match!" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraErorr", { message: "Server is down." });
//     console.log(data);
//   };
//   console.log(errors);
//   // console.log(watch());
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "email required",
//             pattern: {
//               value: /^[A-za-z0-9._%+-]+@naver.com$/,
//               message: "only Naver.com emails allowed",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("firstName", {
//             required: "first name required",
//             validate: {
//               noKim: (value) =>
//                 value.includes("Kim") ? "No Kims allowed" : true,
//               noJun: (value) =>
//                 value.includes("Jun") ? "No Juns allowed" : true,
//             },
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>

//         <input
//           {...register("lastName", { required: "last name required" })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>

//         <input
//           {...register("username", {
//             required: "username required",
//             minLength: 10,
//           })}
//           placeholder="Username"
//         />
//         <span>{errors?.username?.message}</span>

//         <input
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "Your passsword is too short",
//             },
//           })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>

//         <input
//           {...register("confirmPassword", {
//             required: "confirm password is required",
//             minLength: 5,
//           })}
//           placeholder="Confirm Password"
//         />
//         <span>{errors?.confirmPassword?.message}</span>

//         <button>Add</button>
//         {/* <span>{errors?.extraErorr?.message}</span> */}
//       </form>
//     </div>
//   );
// }
