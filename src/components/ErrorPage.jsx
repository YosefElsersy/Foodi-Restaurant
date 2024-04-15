import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import logo from "/logo.svg";

export default function ErrorPage() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = '404 Error.';

    // Optionally, you can clear the title when the component unmounts
    return () => {
      document.title = ''; // Reset the document title
    };
  }, []);
  
  const error = useRouteError();
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <div className="icon__download mb-4">
            <img src={logo} alt="React Logo" className="w-32 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">404 Error</h1>
          <p className="text-lg text-gray-600 my-4">We can`t find the page you are looking for.</p>
          <p className="text-sm text-gray-600 mb-8">{error.statusText || error.message}</p>
          <Link to='/' className="block bg-green hover:bg-green text-white font-semibold py-2 px-4 rounded">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
