import React from 'react';
import restaurantImage from '../../../../public/images/home/banner.png'; // Import your restaurant image
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        {/* img */}
        <div className="md:w-1/2">
          <img src={restaurantImage} alt="Restaurant" />
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Welcome to Foodi Restaurant<br/> <span className="text-green bg-gray-800 rounded-full px-3 py-1">Admin Panel</span>
          </h2>
          {/* <p className="text-[#4A4A4A] text-xl">
            Experience the finest culinary delights in a cozy atmosphere.
          </p> */}
          <Link to='/dashboard/manage-orders' className="text-green bg-gray-800 font-semibold btn  px-8 py-3 rounded-full ml-2 mt-5">
            Manage Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;