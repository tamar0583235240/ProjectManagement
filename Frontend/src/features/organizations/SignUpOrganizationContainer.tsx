// components/signup/SignUpOrganizationContainer.tsx
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

import SignUpOrganizationForm from "./SignUpOrganizationForm"
// import { SchemaOrganization, OrganizationFormData } from "../../schemas/SchemaSignUpOrganization"
import { useAddOrganizationMutation } from "../organizations/organizationsApi"
import { useSignUpMutation } from "../auth/authApi"
import { type FormData } from "../../schemas/SchemaSignUp"
import type { Organization } from "../../types/Organization"
import type { User } from "../../types/User"
import { SchemaOrganization, type OrganizationFormData } from "../../schemas/SchemaSignUpOrganization"

interface Props {
  open: boolean
  onClose: () => void
  userData: FormData | null
  onSuccess?: () => void
}

const SignUpOrganizationContainer: React.FC<Props> = ({ open, onClose, userData, onSuccess }) => {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(["token"])
  const [addOrganization] = useAddOrganizationMutation()
  const [addUser] = useSignUpMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(SchemaOrganization),
    defaultValues: {
      organization_name: "",
      organization_description: "",
      organization_address: "",
      organization_phone: "",
    },
  })

  const onSubmit = async (data: OrganizationFormData) => {
    if (!userData) return alert("Missing user data")

    try {
      const organization: Organization = {
        ...data,
        manager_id: null,
      }

      const resOrg = await addOrganization(organization).unwrap()

      const user: User = {
        user_name: userData.username,
        password: userData.password,
        email: userData.email,
        role: "MANAGER",
        manager_id: null,
        organization_id: resOrg._id,
      }

      const response = await addUser(user).unwrap()
      setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 })
      localStorage.setItem("currentUser", JSON.stringify(response.user))

      alert("Registration completed successfully!")
      reset()
      onClose()
      if (onSuccess) onSuccess()
    } catch (error: any) {
      alert("Registration failed: " + (error?.data?.message || "Unknown error"))
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
    navigate("/landingPage")
  }

  return (
    <SignUpOrganizationForm
      open={open}
      onClose={onClose}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    />
  )
}

export default SignUpOrganizationContainer
