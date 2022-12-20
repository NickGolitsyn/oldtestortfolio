import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';

import './App.css'

function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { projects } = await request(
        'https://api-eu-west-2.hygraph.com/v2/clbff1lwo0rov01uj0aqtergf/master',
        `
        {
          projects {
            id,
            title,
            slug
          }
        }
        `
      );

      setProjects(projects);
    };

    fetchProjects();
  }, []);

  return (
    <div className="App">
      <div className="portfolio-container">
        <h2>Projects:</h2>
        {!projects ? (
          'Loading'
        ) : (
          <ul className='mt-5 proj'>
            {projects.map(({ id, title, slug }) => (
              <li key={id}>
                <Link className='td-none c-white' to={`/projects/${slug}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="about-me">
        <h1>Nicholai Golitsyn</h1>
        <h2>Web Developer</h2>
      </div>
      {/* <Router>
        <Routes>
          <Route path="/projects/:slug" element={<Project projects={projects} />} />
        </Routes>
      </Router> */}
    </div>
  )
}

export default App
