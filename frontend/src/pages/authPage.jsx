import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">

      <div className="w-full max-w-[900px] flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT SIDE */}
        <div className="flex-1 hidden lg:block">
          <h1 className="text-[40px] font-black text-[#1877f2]">
            facebook
          </h1>
          <p className="text-[24px] text-[#1c1e21]">
            Connect with people and explore what you love.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[396px]">

          {isLogin ? (
            <Login switchToRegister={() => setIsLogin(false)} />
          ) : (
            <Register switchToLogin={() => setIsLogin(true)} />
          )}

          <p className="text-center mt-4 text-xs text-gray-500">
            META
          </p>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;