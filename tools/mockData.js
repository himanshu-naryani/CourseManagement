const courses = [
    {
        id: 1,
        title: "Securing React Apps with Auth0",
        slug: 'react-auth0-authentication-security',
        authorId: 1,
        category: "JavaScript"
    },
    {
        id: 2,
        title: "React: The Big Picture",
        slug: 'react-big-picture',
        authorId: 2,
        category: "JavaScript"
    },
    {
        id: 3,
        title: "Creating Reusable React Components",
        slug: 'react-creating-reusable-components',
        authorId: 3,
        category: "Software Architecture"
    },
    {
        id: 4,
        title: "Building a Javascipt Runtime Environment",
        slug: 'javascipt-runtime-environment',
        authorId: 3,
        category: "JavaScript"
    },
    {
        id: 5,
        title: "Building Application with React and Redux",
        slug: 'react-redux-react-router-es6',
        authorId: 2,
        category: "Software Pictures"
    },
    {
        id: 6,
        title: "Building Application in React and Flux",
        slug: 'react-flux-building-applications',
        authorId: 1,
        category: "Software Development"
    },
    {
        id: 7,
        title: "Clean Code: Writing Code for Humans",
        slug: 'writing-clean-code-humans',
        authorId: 3,
        category: "Software Deployment"
    },
    {
        id: 8,
        title: "Web Component Fundamentals",
        slug: 'web-components-shadow-dom',
        authorId: 2,
        category: "HTML"
    }
]

const authors = [
    { id: 1, name: 'Himanshu', specialization: 'Javascript', coursesId: [1, 6], yearsOfExpeirence: 1 },
    { id: 2, name: 'Manoj', specialization: 'Cloud Computing', coursesId: [2, 5, 8], yearsOfExpeirence: 12 },
    { id: 3, name: 'Aman', specialization: 'DevOps', coursesId: [3, 4, 7], yearsOfExpeirence: 1 },
]

const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
}

const newAuthor = {
    id: null,
    name: "",
    specialization: "",
    coursesId: [],
    yearsOfExpeirence: null
}

module.exports = {
    authors,
    courses,
    newCourse,
    newAuthor
}