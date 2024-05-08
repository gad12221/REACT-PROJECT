import React from 'react'
import './About.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title dark:text-white">About</h1>
      <div className="about-text">
        <p className="dark:text-white">
          This project is built using React with TypeScript. React is a popular
          JavaScript library for building user interfaces, and TypeScript adds
          static typing to JavaScript, providing better tooling and developer
          experience.
        </p>
        <p className='dark:text-white'>
          The project utilizes various React features such as functional
          components, hooks (useState, useEffect), and React Router for
          navigation. Additionally, it integrates TypeScript for type safety
          and improved code maintainability.
        </p>
        <p className='dark:text-white'>
          The knowledge base used by this project is based on the latest
          available information up to the specified cutoff date.
        </p>
        <p className='dark:text-white'>
          For more information, visit the{" "}
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React website
          </a>{" "}
          and the{" "}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            TypeScript website
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default About