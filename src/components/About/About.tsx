import { useState } from "react";
import { SquareLoader } from "react-spinners";

const About = () => {
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div>
      <button className="bg-purple-500 text-white rounded p-5 text-2xl mb-2" onClick={() => setShowProgress(!showProgress)}>Toggle</button>
      {showProgress && (
        <SquareLoader
          color="#36d7b7"
          cssOverride={{}}
          loading
          size={60}
          speedMultiplier={1}
        />
      )}
      <p>{`${showProgress}`}</p>
    </div>
  );
};

export default About;