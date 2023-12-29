import React from "react";
import Link from 'next/link';

const Header = () => {

  return (
    <div className="bg-green-500 p-8 display-flex flex font-bold items-center justify-between text-xl text-white">
    QUIZ APP
      <ul className="flex gap-7 mr-5">
        <Link href="/Quiz">Take Quiz !</Link>
      </ul>
    </div>
  );
};

export default Header;
