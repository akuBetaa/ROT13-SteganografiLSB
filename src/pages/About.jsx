import React from 'react';
import ArbiImg from '../assets/img/Arbi.jpg';
import BetaImg from '../assets/img/Beta.jpeg';
import ViraImg from '../assets/img/Vira.jpeg';
import RismaImg from '../assets/img/Risma.png';

const About = () => {
  const teamMembers = [
    {
      name: 'Beta Nurul Awwalin',
      role: '21104410091',
      imageSrc: BetaImg, 
      social: {
        instagram: 'https://www.instagram.com/aku.beta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        linkedin: 'https://github.com/akuBetaa',
        github: '#https://www.linkedin.com/in/betanurulawwalin/',
      }
    },
    {
      name: 'Mohammad Arbi Yoganata',
      role: '21104410073',
      imageSrc: ArbiImg, 
      social: {
        instagram: 'https://www.instagram.com/veynata_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        linkedin: 'https://www.linkedin.com/in/betanurulawwalin/',
        github: 'https://github.com/akuBetaa',
      }
    },
    {
      name: 'Rizka Magvira',
      role: '21104410089',
      imageSrc: ViraImg,
      social: {
        instagram: 'https://www.instagram.com/iamv.ra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        linkedin: 'https://www.linkedin.com/in/rizka-magvira/',
        github: 'https://github.com/rizkamagvira',
      }
    },
    {
      name: 'Kharisma Dinda Amareta',
      role: '21104410055',
      imageSrc: RismaImg,
      social: {
        instagram: 'https://www.instagram.com/hi_kharisma_/',
        linkedin: 'https://www.linkedin.com/in/kharisma-dinda-amareta/',
        github: 'https://github.com/Kharismada18',
      }
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
              KELOMPOK 2
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ANGGOTA TIM
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="object-cover object-center w-full h-96" 
                  />
                </div>
                {member.social && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 
                                flex justify-center space-x-4 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300">
                    <a href={member.social.instagram} className="text-gray-400 hover:text-gray-500">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-300 hover:text-gray-500">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-500">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
