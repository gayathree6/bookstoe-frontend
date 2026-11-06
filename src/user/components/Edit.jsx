
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import { userUpdateAPI } from '../../services/allAPI'
import { useNavigate } from 'react-router-dom'

function Edit() {
  const [editStatus, setEditStatus] = useState(false)

  const [userDetails, setUserDetails] = useState({
    _id: "",
    username: "",
    password: "",
    cPassword: "",
    picture: "",
    bio: ""
  })

  const [existingPicture, setExistingPicture] = useState("")
  const [imageFile, setImageFile] = useState(true)
  const [passwordMathch, setPasswordmatch] = useState(true)
  const [preview, setPreview] = useState("")
  const [selectedPicture, setSelectedPicture] = useState(null)
const navigate = useNavigate()

  const loadUserDetails = () => {
    const storedUser = sessionStorage.getItem("user")

    if (storedUser) {
      const user = JSON.parse(storedUser)

      setUserDetails({
        _id: user._id || "",
        username: user.username || "",
        password: "",
        cPassword: "",
        picture: user.picture || "",
        bio: user.bio || ""
      })

      setExistingPicture(user.picture || "")
      setSelectedPicture(null)
      setPreview("")
      setImageFile(true)
      setPasswordmatch(true)
    }
  }

  useEffect(() => {
    loadUserDetails()
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.type.startsWith("image/")) {
      setSelectedPicture(file)

      setUserDetails((prev) => ({
        ...prev,
        picture: file
      }))

      setPreview(URL.createObjectURL(file))
      setImageFile(true)
    } else {
      setSelectedPicture(null)
      setPreview("")
      setImageFile(false)
      e.target.value = ""
    }
  }

  const checkPasswordMatch = (data) => {
    setUserDetails((prev) => ({
      ...prev,
      cPassword: data
    }))

    setPasswordmatch(userDetails.password === data)
  }

  const resetProfileForm = () => {
    const storedUser = sessionStorage.getItem("user")

    if (!storedUser) return

    const user = JSON.parse(storedUser)

    setUserDetails({
      _id: user._id || "",
      username: user.username || "",
      password: "",
      cPassword: "",
      picture: user.picture || "",
      bio: user.bio || ""
    })

    setExistingPicture(user.picture || "")
    setSelectedPicture(null)
    setPreview("")
    setImageFile(true)
    setPasswordmatch(true)
  }

  const updateProfile = async () => {
  const { username, password, cPassword, bio } = userDetails

  if (!username.trim() || !bio.trim()) {
    toast.warning("Please fill in all required fields")
    return
  }

  if (password && password !== cPassword) {
    setPasswordmatch(false)
    toast.warning("Password and confirm password do not match")
    return
  }

  try {
    const reqbody = new FormData()
    reqbody.append("_id", userDetails._id)
    reqbody.append("username", username)
    reqbody.append("bio", bio)

    if (password) {
      reqbody.append("password", password)
    }

    if (selectedPicture) {
      reqbody.append("picture", selectedPicture)
    }

    const result = await userUpdateAPI(userDetails._id, reqbody)

    if (result.status === 200) {
      const updatedUser = result.data?.user || result.data

      if (password.trim() !== "") {
        sessionStorage.removeItem("user")
        setEditStatus(false)
        navigate("/login") // Change this if your login route differs
        return
      }

      sessionStorage.setItem("user", JSON.stringify(updatedUser))
      setExistingPicture(updatedUser.picture || "")
      setSelectedPicture(null)
      setPreview("")
      setPasswordmatch(true)
      setEditStatus(false)

      toast.success("Profile updated successfully")
    }
  } catch (error) {
    console.error("Profile update error:", error)
    toast.error(
      error.response?.data?.message || "Profile update failed"
    )
  }
}

  const getPictureUrl = () => {
    if (preview) return preview

    if (!existingPicture) {
      return "https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
    }

    if (existingPicture.startsWith("http")) {
      return existingPicture
    }

    return `http://localhost:3000/uploads/${encodeURIComponent(existingPicture)}`
  }

  return (
    <>
      {/* EDIT BUTTON */}
<div className="w-full flex justify-end">
  <button
    onClick={() => {
      loadUserDetails()
      setEditStatus(true)
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded-md"
  >
    Edit
  </button>
</div>

      {/* EDIT PROFILE MODAL */}
      {editStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 !p-4">
          <div className="bg-white w-full max-w-xl rounded-sm shadow-xl overflow-hidden">

            {/* BLACK HEADER */}
            <div className="bg-black text-white flex justify-between items-center !px-2 !py-2">
              <h2 className="text-sm">Edit User Details</h2>

              <button
                onClick={() => setEditStatus(false)}
                className="text-white text-xl"
              >
                ×
              </button>
            </div>

            {/* FORM BODY */}
            <div className="max-h-[75vh] overflow-y-auto !p-4">
              <div className="bg-blue-200 !p-4 sm:p-6 rounded-sm">

                {/* PROFILE PICTURE */}
                <div className="rounded bg-blue-200 !p-5 flex justify-center items-center flex-col">
                  <input
                    type="file"
                    className="hidden"
                    id="userPic"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />

                  <label
                    htmlFor="userPic"
                    className="cursor-pointer relative"
                  >
                    <img
                      src={getPictureUrl()}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />

                    <span className="absolute bottom-0 right-0 bg-yellow-400 text-white rounded !p-1">
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  </label>

                  {!imageFile && (
                    <div className="!mt-3 text-red-500 text-sm">
                      *Only image files can be uploaded
                    </div>
                  )}
                </div>

                {/* USERNAME */}
                <input
                  type="text"
                  placeholder="User Name"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      username: e.target.value
                    }))
                  }
                  className="w-full !mb-2 rounded !px-2 !py-2 text-sm outline-none bg-white"
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  placeholder="Password"
                  value={userDetails.password}
                  onChange={(e) => {
                    const password = e.target.value

                    setUserDetails((prev) => ({
                      ...prev,
                      password,
                      cPassword: ""
                    }))

                    setPasswordmatch(true)
                  }}
                  className="w-full !mb-2 rounded !px-2 !py-2 text-sm outline-none bg-white"
                />

                {/* CONFIRM PASSWORD */}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={userDetails.cPassword}
                  onChange={(e) => checkPasswordMatch(e.target.value)}
                  className="w-full !mb-2 rounded !px-2 !py-2 text-sm outline-none bg-white"
                />

                {userDetails.password !== userDetails.cPassword &&
                  userDetails.cPassword !== "" && (
                    <p className="text-red-500 text-sm !mb-2">
                      *Password and confirm password are not matching
                    </p>
                  )}

                {/* BIO */}
                <input
                  type="text"
                  placeholder="Bio"
                  value={userDetails.bio}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      bio: e.target.value
                    }))
                  }
                  className="w-full !mb-2 rounded !px-2 !py-2 text-sm outline-none bg-white"
                />

                {/* BUTTONS */}
                <div className="flex justify-end gap-2 !mt-3">
                  <button
                    onClick={resetProfileForm}
                    className="border border-gray-500 bg-yellow-500 !px-4 !py-2 rounded text-sm"
                  >
                    Reset
                  </button>

                  <button
                    onClick={updateProfile}
                    className="bg-blue-600 text-white !px-4 !py-2 rounded text-sm"
                  >
                    Update
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  )
}

export default Edit
