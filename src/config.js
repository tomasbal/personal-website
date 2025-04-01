module.exports = {
  siteTitle: 'Tomislav Balabanov | Solutions Architect | Cloud Engineer',
  siteDescription:
    'Tomislav is an experienced Solutions Architect and Software Engineer based in North Macedonia, specialized in designing and implementing high-impact cloud solutions on AWS and Azure.',
  siteKeywords:
    'Tomislav Balabanov, Solutions Architect, AWS, Azure, Cloud Architecture, Security Architect, Software Engineer, North Macedonia',
  siteUrl: 'https://tomislavbalabanov.me',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-32927754-2',
  googleVerification: 'jsX5pad6Yx23jma_DdyfAzJSDwINvVgMYua0VqVsZSc',
  name: 'Tomislav Balabanov',
  location: 'North Macedonia, Skopje',
  email: 'tomislav@tomislavbalabanov.me',
  github: 'https://github.com/tomasbal',
  twitterHandle: '@tomasbal',
  socialMedia: [
    {
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
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Skills',
      url: '/#competence',
    },
    {
      name: 'Certifications',
      url: '/#certificates',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Blog',
      url: '/blog',
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
      z: 0,
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
      left: 0,
    },
  }),
};
