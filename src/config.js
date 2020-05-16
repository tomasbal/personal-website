module.exports = {
  siteTitle: 'Tomislav Balabanov | Web Developer | Software Engineer',
  siteDescription: 'Tomislav is software engineer based in North Macedonia, specialized in building (and occasionally designing) exceptional websites, applications, and everything in between.',
  siteKeywords: 'Tomislav Balabanov, Tomislav, Balabanov, tomasbal, software engineer, front-end engineer, web developer, javascript, northmacedonia',
  siteUrl: 'https://tomislavbalabanov.me',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-32927754-2',
  googleVerification: '',
  name: 'Tomislav Balabanov',
  location: 'North Macedonia, Skopje',
  email: 'tomislav@tomislavbalabanov.me',
  github: 'https://github.com/tomasbal',
  twitterHandle: '@tomasbal',
  socialMedia: [{
      name: 'GitHub',
      url: 'https://github.com/tomasbal',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/tomislavbalabanov/',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tomasbal',
    }
  ],

  navLinks: [{
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  }),
};
