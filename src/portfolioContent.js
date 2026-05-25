export const PORTFOLIO_CONTENT = {
  hero: {
    eyebrow: '',
    title: 'Welcome to my under construction page!',
    subtitle: 'What do you call a fat penguin?', 
    cta: 'Click for a hint',
    hintGifSrc: '/pic/fat.jpg',
    hintText: 'actually there is no hint, think more!',
    solutionCta: 'View solution',
    solutionText: "it's called an ice breaker",
  },
  life: {
    eyebrow: '',
    title: 'About me',
    subtitle: `Hello hello, my name is Aurore. 
              I am studying Software Engineering at McGill University. 
              I have another expertise. 
              I am on my way to become a professional dog trainer, 
              experienced dog walker, and dedicated dog companion.
              Got a pup who needs some guidance, a walk, or just a great playdate? 
              Feel free to reach out — I'd love to help! 🎓🐕`,
    cta: 'Next',
    panels: [
      {
        type: 'Education',
        title: 'McGill University',
        logoSrc: '/logos/mcgill-logo.png',
        meta: 'Bachelor of Engineering, Software Engineering (Co-op)',
        details: [
          'Aug 2024 - Apr 2028',
          'Potential minor maybe ( ╹ -╹)?',
        ],
      },
      {
        type: 'Education',
        title: 'College Marianopolis',
        logoSrc: '/logos/marianopolis-logo.png',
        meta: 'Health Science',
        details: [
          'Aug 2022 - May 2024',
        ],
      },
      {
        type: 'Experience',
        title: 'Ericsson',
        logoSrc: '/logos/ericsson-logo.png',
        meta: 'Software Developer Intern',
        details: [
          'Incoming Summer 2026',
          'I will be learning ٩(｡•́‿•̀｡)۶',
        ],
      },
    ],
  },
  contact: {
    eyebrow: "I love playing with dogs. My favorite hobby is walking dogs outside ૮ • ﻌ - ა",
    title: '',
    subtitle: [
          'My current status: Me and No dog',
          'My expected 202? status: Me and my Shiba Inu.',
        ],
    photos: [
      '/photos/dogs/1.jpg',
      '/photos/dogs/2.jpg',
      '/photos/dogs/3.jpg',
      '/photos/dogs/4.jpg',
    ],
  },
  friends: {
    eyebrow: 'Doggies!',
    title: '',
    subtitle: [
      'I love playing with dogs. My favorite hobby is walking dogs outside ૮ • ﻌ - ა',
      'Current status: Single with no dog',
      'Expected 202? status: Single with a Shiba Inu.',
    ],
    members: [
      {
        id: 'p1',
        name: 'Pumpkin',
        thumbSrc: '/photos/dogs/3.jpg',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Pumpkin' },
          { label: 'Species', value: 'Pomeranian' },
          { label: 'Played with me since',    value: 'August 2023' },
          { label: 'Fact', value: 'When I sleep, I snore a lots!' },
        ],
      },
      {
        id: 'p2',
        name: 'Gana',
        thumbSrc: '/photos/dogs/4.jpg',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Gana' },
          { label: 'Species', value: '—' },
          { label: 'Since',    value: '—' },
          { label: 'Fact', value: 'Aurore found me and spent 7 days with me in Tokyo' },
        ],
      },
      {
        id: 'p3',
        name: 'MaoDou',
        thumbSrc: '',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Gana' },
          { label: 'Species', value: '—' },
          { label: 'Since',    value: '—' },
          { label: 'Fact', value: '-' },
        ],
      },
      {
        id: 'p4',
        name: 'Name',
        thumbSrc: '',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Gana' },
          { label: 'Species', value: '—' },
          { label: 'Since',    value: '—' },
          { label: 'Fact', value: '-' },
        ],
      },
      {
        id: 'p5',
        name: 'Name',
        thumbSrc: '',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Gana' },
          { label: 'Species', value: '—' },
          { label: 'Since',    value: '—' },
          { label: 'Fact', value: '-' },
        ],
      },
      {
        id: 'p6',
        name: 'Name',
        thumbSrc: '',
        detailSrc: '',
        bio: [
          { label: 'Name',     value: 'Gana' },
          { label: 'Species', value: '—' },
          { label: 'Since',    value: '—' },
          { label: 'Fact', value: '-' },
        ],
      },
    ],
  },
};
