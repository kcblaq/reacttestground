import { useForm } from "react-hook-form";
import { RegSchema, regSchema } from "../schema/registrationFormSChema";
import { zodResolver } from "@hookform/resolvers/zod"

export function RegegistrationForm() {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<RegSchema>({
        resolver: zodResolver(regSchema)
    })

    function formSubmit(data: RegSchema) {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-2 w-2xl bg-gray-200 shadow-2xl rounded-3xl p-3">
            <input placeholder="Enter name" {...register("name")} className=" p-2 rounded-2xl shadow border border-gray-200" />
            {errors.name && <small className="text-red-300"> {errors.name?.message} </small>}
            <input placeholder="Enter Email" {...register("email")} className=" p-2 rounded-2xl shadow border border-gray-200" />
            {errors.email && <small className="text-red-300"> {errors.email?.message} </small>}
            <input placeholder="Enter bio" {...register("bio")} className=" p-2 rounded-2xl shadow border border-gray-200" />
            {errors.bio && <small className="text-red-300"> {errors.bio?.message} </small>}

            <button className="bg-orange-400 text-white p-2 rounded-2xl cursor-pointer hover:bg-orange-200 hover:text-orange-400
        hover:border" type="submit"> Create User </button>

        </form>
    )
} 