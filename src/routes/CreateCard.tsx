import './CreateCard.scss';
import { useForm } from "react-hook-form";
import { CreateCardType } from "../@types/types";
import { useNavigate } from "react-router-dom";
import { createCardMock } from "../mocks/createCard";
import { cards } from "../services/cards";
import dialogs from "../UI/dialogs";

const CreateCard = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardType>({
    defaultValues: createCardMock,
  });

  const navigate = useNavigate();



  //const for onSubmit
  const onCreateCard = (data: CreateCardType) => {
    cards
      .createCard(data)
      .then((res) => {
        localStorage.setItem("card_id", res.data._id);
        dialogs.create("Successfully", "Your card saved").then(() => {
          navigate("/cards");
        });
      })
      .catch((e) => {
        dialogs.error("Error", e.response.data);
      });
  };



  return (
    <div className="createCard-container dark:bg-gray-600">
      <h1 className="text-3xl font-bold">
        Card - Edit
      </h1>
      <h2>Put a new values in the correct input</h2>

      {/* form */}

      <form noValidate onSubmit={handleSubmit(onCreateCard)} >

        {/* Title */}

        <section>
          <input className="w-full "
            placeholder="Title"
            type="text"
            {...register("title", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.title?.message && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </section>

        {/* subtitle */}

        <section>
          <input
            placeholder="Subtitle"
            type="text"
            {...register("subtitle", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.subtitle?.message && (
            <p className="text-red-500">{errors.subtitle?.message}</p>
          )}
        </section>

        {/* Description */}

        <section>
          <input
            placeholder="Description"
            type="text"
            {...register("description", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 1024, message: "Too long" },
            })}
          />
          {errors.description?.message && (
            <p className="text-red-500">{errors.description?.message}</p>
          )}
        </section>

        {/* Phone */}

        <section>
          <input
            placeholder="Phone"
            type="text"
            {...register("phone", {
              required: "This field is mandatory",
              minLength: { value: 9, message: "Too short" },
              maxLength: { value: 11, message: "Too long" },
            })}
          />
          {errors.phone?.message && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}
        </section>

        {/* Email */}

        <section>
          <input
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "This field is mandatory",
              minLength: { value: 5, message: "Too short" },
              maxLength: { value: 25, message: "Too long" },
            })}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </section>

        {/* Web */}

        <section>
          <input
            placeholder="Web"
            type="text"
            {...register("web", {

            })}
          />
          {errors.web?.message && (
            <p className="text-red-500">{errors.web?.message}</p>
          )}
        </section>

        {/* image url */}

        <section>
          <input
            placeholder="Image url"
            type="text"
            {...register("image.url", {
              required: "This field is mandatory",

            })}
          />
          {errors.image?.url?.message && (
            <p className="text-red-500">{errors.image?.url?.message}</p>
          )}
        </section>


        {/* Image alt */}

        <section>
          <input
            placeholder="Image alt"
            type="text"
            {...register("image.alt", {
              required: "This field is mandatory",

            })}
          />
          {errors.image?.alt?.message && (
            <p className="text-red-500">{errors.image?.alt?.message}</p>
          )}
        </section>

        {/* address state */}

        <section>
          <input
            placeholder="State"
            type="text"
            {...register("address.state", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.state?.message && (
            <p className="text-red-500">{errors.address?.state?.message}</p>
          )}
        </section>

        {/* address country */}

        <section>
          <input
            placeholder="Country"
            type="text"
            {...register("address.country", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.country?.message && (
            <p className="text-red-500">{errors.address?.country?.message}</p>
          )}
        </section>

        {/* address city */}

        <section>
          <input
            placeholder="City"
            type="text"
            {...register("address.city", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.city?.message && (
            <p className="text-red-500">{errors.address?.city?.message}</p>
          )}
        </section>

        {/* address street */}

        <section>
          <input
            placeholder="Street"
            type="text"
            {...register("address.street", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.street?.message && (
            <p className="text-red-500">{errors.address?.street?.message}</p>
          )}
        </section>

        {/* address house number */}

        <section>
          <input
            placeholder="House number"
            type="text"
            {...register("address.houseNumber", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.houseNumber?.message && (
            <p className="text-red-500">{errors.address?.houseNumber?.message}</p>
          )}
        </section>

        {/* address zip */}

        <section>
          <input
            placeholder="Zip"
            type="text"
            {...register("address.zip", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 256, message: "Too long" },
            })}
          />
          {errors.address?.zip?.message && (
            <p className="text-red-500">{errors.address?.zip?.message}</p>
          )}
        </section>


        <button type="submit">Create</button>

      </form>

    </div>
  )
}

export default CreateCard