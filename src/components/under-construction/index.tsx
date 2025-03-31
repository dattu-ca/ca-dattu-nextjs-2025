import React from "react";

const UnderConstruction = () => {
  return (
    <div className="bg-gray-300 p-5 absolute w-full">
      <div className="container mx-auto text-center ">
        <h1 className="text-2xl">Site is under reconstruction</h1>
        <p>
          Code is at{" "}
          <a
            href="https://github.com/dattu-ca/ca-dattu-nextjs-2025"
            target="_blank"
          >
            https://github.com/dattu-ca/ca-dattu-nextjs-2025
          </a>
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
