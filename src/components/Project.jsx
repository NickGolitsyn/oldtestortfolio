import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { request } from 'graphql-request';

import '../styles/Project.css';

function Project() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [width, setWidth] = useState(16);

  const handleMouseEnter = () => {
    setWidth(20)
  }

  const handleMouseLeave = () => {
    setWidth(16)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const {project} = await request(
        'https://api-eu-west-2.hygraph.com/v2/clbff1lwo0rov01uj0aqtergf/master',
        `
        {
          project(where: {slug: "${slug}"}) {
            id
            slug
            stack
            title
            url
            content {
              html
            }
          }
        }
        `
      );
      
      setProject(project);
      console.log(project);
    };

    fetchProjects();
  }, []);

  return <div>
    <div className='nav w-90vw flex m-auto items-center'>
      <Link 
        className='back-btn td-none c-white flex' 
        to={`/`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width='24' height="12" viewBox='0 0 16 8'  transform="scale(1)" fill="none">
            <path d='M16 4H0M0 4C2 4 4 2 4 0M0 4C2 4 4 6 4 8' stroke="#EEF0F3"/>
          </svg>
        </span>
        <span className='back-text'>BACK</span>
      </Link>
      {!project  ? <></> : <a className='td-none c-white web-link' href={project.url} target='_blank'>Visit the website</a>}
      
    </div>
    <div className='w-90vw flex flex-col m-auto'>
      {!project ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className='proj-title'>{project.title}</h1>
          <ul className='stack-items flex flex-row'>
          {project.stack.map((e) => (
            <li>{e.toUpperCase()}</li>
          ))}
          </ul>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: project.content.html }}
          ></div>
        </>
      )}
    </div>
    
  </div>
}

export default Project;