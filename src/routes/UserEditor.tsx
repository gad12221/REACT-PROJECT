import React, { useEffect, useState } from 'react'
import Register from './Register'
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../@types/types';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { updateUser, userDetails } from '../services/auth';
import dialogs from '../UI/dialogs';
import patterns from '../validation/patterns';
import { BsEye, BsEyeSlashFill } from 'react-icons/bs';

const UserEditor = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterUser>();

  const navigate = useNavigate();
  const { id } = useParams();
  const [isBusiness, setIsBusiness] = useState({} as boolean);
  const [isAdmin, setIsAdmin] = useState({} as boolean);
  const [showPassword, setShowPassword] = useState(false);

  const onEdit = (data: RegisterUser) => {
    updateUser(id, data).then((res) => {
      console.log(res);
      localStorage.setItem("user_id", res.data._id);
      dialogs.create("Success", "User edited successfully").then(() => {
        navigate("/profile");
      });
      return res;
    }).catch((err) => console.log(err));


  }
  useEffect(() => {
    userDetails(id).then((res) => {

      setValue("name.first", res.data.first);
      setValue("name.middle", res.data.middle);
      setValue("name.last", res.data.last);
      setValue("phone", res.data.phone);
      setValue("email", res.data.email);
      setValue("password", res.data.password);
      setValue("image.url", res.data.image.url);
      setValue("image.alt", res.data.image.alt);
      setValue("address.state", res.data.address.state);
      setValue("address.country", res.data.address.country);
      setValue("isBusiness", res.data.isBusiness);
      setValue("isAdmin", res.data.isAdmin);
    }).catch((err) => {
      dialogs.error("Error", err.response.data);
    })
  }, []);
  const handleBusinessCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBusiness(e.target.checked);
  };
  const handleAdminCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(e.target.checked);
  }

  return (
    <div className="register-container bg-gray-300 dark:bg-gray-800">
      <h2>User EDITOR</h2>
      <form noValidate onSubmit={handleSubmit(onEdit)}>
        {/* firstName */}
        <section>
          <input
            placeholder="First Name"
            type="text"
            {...register("name.first", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.first && (
            <p className="text-red-500">{errors.name?.first?.message}</p>
          )}
        </section>

        {/* middle */}
        <section>
          <input
            placeholder="Middle Name"
            type="text"
            {...register("name.middle", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.middle && (
            <p className="text-red-500">{errors.name?.middle?.message}</p>
          )}
        </section>

        {/* last */}
        <section>
          <input
            placeholder="Last Name"
            type="text"
            {...register("name.last", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.last && (
            <p className="text-red-500">{errors.name?.last?.message}</p>
          )}
        </section>

        {/* phone */}
        <section>
          <input
            placeholder="Phone"
            type="tel"
            {...register("phone", {
              required: "This field is mandatory",
              minLength: { value: 9, message: "Too short" },
              maxLength: { value: 14, message: "Too long" },
            })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}
        </section>

        {/* email */}
        <section>
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: {
                value: patterns.email,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </section>

        {/* password */}
        <section>
          <div className="password-container">
            <input
              placeholder="Password"
              type={showPassword ? `text` : `password`}
              {...register("password", {
                required: "This field is mandatory",
                pattern: {
                  value: patterns.password,
                  message:
                    "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                },
              })}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword((s) => !s);
              }}
            >
              {showPassword ? <BsEye /> : <BsEyeSlashFill />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </section>

        {/* image.url */}
        <section>
          <input
            placeholder="Image URL"
            type="url"
            {...register("image.url", {
              pattern: {
                value: patterns.url,
                message: "Invalid image URL",
              },
            })}
          />
          {errors.image?.url && (
            <p className="text-red-500">{errors.image?.url?.message}</p>
          )}
        </section>

        {/* image.alt */}
        <section>
          <input
            placeholder="Image Description"
            type="text"
            {...register("image.alt", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.image?.alt && (
            <p className="text-red-500">{errors.image?.alt?.message}</p>
          )}
        </section>

        {/* address.state */}
        <section>
          <input
            placeholder="State"
            type="text"
            {...register("address.state", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.state && (
            <p className="text-red-500">{errors.address?.state?.message}</p>
          )}
        </section>

        {/* address.country */}
        <section>
          <input
            placeholder="Country"
            type="text"
            {...register("address.country", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.country && (
            <p className="text-red-500">{errors.address?.country?.message}</p>
          )}
        </section>

        {/* address.city */}
        <section>
          <input
            placeholder="City"
            type="text"
            {...register("address.city", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.city && (
            <p className="text-red-500">{errors.address?.city?.message}</p>
          )}
        </section>

        {/* address.street */}
        <section>
          <input
            placeholder="Street"
            type="text"
            {...register("address.street", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.street && (
            <p className="text-red-500">{errors.address?.street?.message}</p>
          )}
        </section>

        {/* address.houseNumber */}
        <section>
          <input
            placeholder="House Number"
            type="number"
            {...register("address.houseNumber", {
              required: "This field is mandatory",
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })}
          />
          {errors.address?.houseNumber && (
            <p className="text-red-500">
              {errors.address?.houseNumber?.message}
            </p>
          )}
        </section>

        {/* address.zip */}
        <section>
          <input
            placeholder="Zip"
            type="number"
            {...register("address.zip", {
              required: "This field is mandatory",
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })}
          />
          {errors.address?.zip && (
            <p className="text-red-500">{errors.address?.zip?.message}</p>
          )}
        </section>

        {/* isBusiness */}
        <section className="checkbox-container">
          <label htmlFor="isBusiness">Business</label>
          <input
            id="isBusiness"
            type="checkbox"
            defaultChecked={isBusiness}
            onChange={handleBusinessCheckBoxChange}
            {...register("isBusiness")}
          />

          {errors.isBusiness && (
            <p className="text-red-500">{errors.isBusiness?.message}</p>
          )}
        </section>

        {/*isAdmin*/}

        <section className="checkbox-container">
          <label htmlFor="isAdmin">Admin</label>
          <input
            id="isAdmin"
            type="checkbox"
            defaultChecked={isAdmin}
            onChange={handleAdminCheckBoxChange}
            {...register("isAdmin")}
          />

          {errors.isAdmin && (<p>{errors.isAdmin?.message}</p>)}
        </section>

        <button type="submit">Edit User</button>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  )
}

export default UserEditor