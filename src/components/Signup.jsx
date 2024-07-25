import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import './Signup.css'
const Signup = ({setCurrentView}) => {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm()

  const delay=(d)=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve();
      },d*1000);
    })
  }
  const onSubmit =async (data)=>{
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await delay(2);
    setCurrentView('login')
  }

  return (
    <div id="container">
    <h1>SIGN UP</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className='signin' placeholder='USER NAME' {...register("username",{
        required:{value:true,message:"This field is required"},
        maxLength:{value:20,message:"Please enter below 20 characters"}
        })} type="text" />
      {errors.username && <span className='error'>{errors.username.message}</span>}
      <input className='signin' placeholder='PASSWORD' {...register("password",{
        required:{value:true,message:"This field is required"},
        minLength:{value:4,message:"Please enter minimum 4 characters"},
        maxLength:{value:20,message:"Please enter below 20 characters"}
      })} type="password" />
      {errors.password && <span className='error'>{errors.password.message}</span>}
      <input disabled={isSubmitting} type="submit" value="SUBMIT"/>
      {isSubmitting && <span>Loading...</span>}
    </form>
  </div>
  )
}

Signup.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};
export default Signup
