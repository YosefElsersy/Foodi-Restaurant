import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for data fetching

const UserProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    try {
      const name = data.name;
      const photoURL = await uploadImage(data.photo[0]);

      // Update both name and photoURL
      await updateUserProfile(name, photoURL);

      // Profile updated successfully
      Swal.fire({
        title: 'Success!',
        text: 'Your profile has been updated successfully',
        icon: 'success',
      }).then(() => {
        navigate('/');
        // Reload the page to refresh the data
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile',
        icon: 'error',
      });
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('key', image_hosting_key);

    const response = await fetch(image_hosting_api, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.data.url;
  };

  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center ">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input type="file" {...register('photo')} className="file-input w-full mt-1" />
          </div>
          <div className="form-control mt-6">
            <input type="submit" value={'Update'} className="btn bg-green text-white" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
