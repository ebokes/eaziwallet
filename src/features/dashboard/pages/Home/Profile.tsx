import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ahmed from "../../../../assets/dashboard/ahmed.png"
import {
  ArrowRightSLine,
  MailOpenLine,
  ShieldCheckFill,
  SmartphoneLine,
  User6Line,
} from "../../../../components/ui/icons/Icons";
import BackBtn from "../../../../components/ui/BackBtn";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import { profileSchema, type ProfileSchema } from "../../schemas/profileSchema";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [editingField, setEditingField] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Abdullah Ghatasheh",
      mobile: "+962 79 890 50 14",
      email: "abdgfx@gmail.com",
    },
    mode: "onChange",
  });

  const handleBack = () => {
    navigate(-1);
  };

  // const handleEdit = (field: string) => {
  //   setEditingField(field);
  // };

  const handleSave = (data: ProfileSchema) => {
    console.log("Saving profile:", data);
    setEditingField(null);
    // Here you would typically save to an API
  };

  const handleCancel = () => {
    reset();
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8">
          <BackBtn onClick={handleBack} />
          <h1 className="text-B6 md:text-B3 flex-1 text-center mt-3 -ml-16">
            Profile Settings
          </h1>
          <div />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 p-[2px] border-verdigris shadow-lg">
              <img
                src={ahmed}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <ShieldCheckFill className=" absolute bottom-0 right-0 w-6 h-6 text-verdigris rounded-full flex items-center justify-center" />
          </div>
          <h2 className="text-B6 text-gray-900 mb-1">Abdullah Ghatasheh</h2>
          <p className="text-R7 text-slate-gray">Joined 2 years ago</p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          {/* Full Name */}
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-lavender flex items-center justify-center flex-shrink-0">
                <User6Line className="w-5 h-5 text-ocean-blue" />
              </div>
              <div className="flex-1 ">
                {editingField === "fullName" ? (
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Full name"
                        error={errors.fullName?.message}
                        autoFocus
                      />
                    )}
                  />
                ) : (
                  <>
                    <p className="text-xs text-primary mb-1">Full name</p>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <p className="font-medium text-gray-900">
                          {field.value}
                        </p>
                      )}
                    />
                  </>
                )}
              </div>
              {editingField === "fullName" ? (
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              ) : (
                <button
                  type="button"
                  // onClick={() => handleEdit("fullName")}
                  className="text-celtic-blue font-medium text-sm hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-cloud flex items-center justify-center flex-shrink-0">
                <SmartphoneLine className="w-5 h-5 text-celtic-blue" />
              </div>
              <div className="flex-1">
                {editingField === "mobile" ? (
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Mobile"
                        error={errors.mobile?.message}
                        autoFocus
                      />
                    )}
                  />
                ) : (
                  <>
                    <p className="text-xs text-slate-gray mb-1">Mobile</p>
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <p className="font-medium text-gray-900">
                          {field.value}
                        </p>
                      )}
                    />
                  </>
                )}
              </div>
              {editingField === "mobile" ? (
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              ) : (
                <button
                  type="button"
                  // onClick={() => handleEdit("mobile")}
                  className="text-celtic-blue font-medium text-sm hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-bright-green flex items-center justify-center flex-shrink-0">
                <MailOpenLine className="w-5 h-5 text-sea-green" />
              </div>
              <div className="flex-1">
                {editingField === "email" ? (
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        type="email"
                        error={errors.email?.message}
                        autoFocus
                      />
                    )}
                  />
                ) : (
                  <>
                    <p className="text-xs text-slate-gray mb-1">Email</p>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <p className="font-medium text-gray-900">
                          {field.value}
                        </p>
                      )}
                    />
                  </>
                )}
              </div>
              {editingField === "email" ? (
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              ) : (
                <button
                  type="button"
                  // onClick={() => handleEdit("email")}
                  className="text-celtic-blue font-medium text-sm hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Change Password */}
          <button
            type="button"
            className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-md bg-pale-pink flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-golden-gate-bridge"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6ZM19 10H5V20H19V10ZM11 15.732C10.6187 15.5119 10.3207 15.1721 10.1522 14.7653C9.98376 14.3586 9.9542 13.9076 10.0681 13.4823C10.1821 13.057 10.4332 12.6813 10.7825 12.4132C11.1318 12.1452 11.5597 11.9999 12 11.9999C12.4403 11.9999 12.8682 12.1452 13.2175 12.4132C13.5668 12.6813 13.8179 13.057 13.9319 13.4823C14.0458 13.9076 14.0162 14.3586 13.8478 14.7653C13.6793 15.1721 13.3813 15.5119 13 15.732V18H11V15.732ZM8 8H16V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="flex-1 text-left font-medium text-gray-900">
              Change password
            </span>
            <ArrowRightSLine className="w-5 h-5 text-gray-400" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
