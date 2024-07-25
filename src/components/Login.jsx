
import { useForm} from "react-hook-form"
import { PropTypes } from "prop-types";
import './Login.css';

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onSubmit =async (data)=>{
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res)
      if (res.ok) {
        props.setCurrentView('songs');
      } else {
        const error = await res.text();
        console.error('Login failed:', error);
        alert('Login failed: ' + error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } 
  }
  return (
    <div id="container">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder='USER NAME'{...register("username",{
        required:{value:true,message:"This field is required"},
        maxLength:{value:20,message:"Please enter below 20 characters"}
        })} type="text" />
      {errors.username && <span className='error'>{errors.username.message}</span>}
      <input placeholder='PASSWORD'{...register("password",{
        required:{value:true,message:"This field is required"},
        minLength:{value:4,message:"Please enter minimum 4 characters"},
        maxLength:{value:20,message:"Please enter below 20 characters"}
      })} type="password" />
      {errors.password && <span className='error'>{errors.password.message}</span>}
      <input type="submit" value="Submit"/>
    </form>
    </div>
  );
}
Login.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};
export default Login;
