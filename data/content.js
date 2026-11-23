/* ============================================================
   CONTENT: all the text and images on your site lives here.

   HOW TO WRITE LONG TEXT
   Wrap it in backticks ( ` ) and write it like normal text.
   You can use a few simple formatting tricks:

     **bold**   *italic*   [link text](https://example.com)
     ## A heading
     - a bullet point
     ![description of image](images/my-photo.jpg)

   Leave a blank line between paragraphs.

   HOW TO ADD IMAGES
   1. Put the image file in the "images" folder.
   2. Refer to it as "images/file-name.jpg".
   ============================================================ */

window.CONTENT = {

  /* ---------- HOME ---------- */
  home: {
    intro: `I'm a student interested in building useful things on the web.
This is where I keep my university work, side projects and the things I'm learning.`
  },

  /* ---------- ABOUT ---------- */
  about: {
    photo: "images/me.svg",
    photoAlt: "Portrait of me",
    body: `
Hi, I'm **Your Name**. I'm studying *your degree* at *your university*.

## What I'm doing now

- Finishing my second year
- Building a small web app in my spare time
- Learning more about *something you're curious about*

## A bit more

Write as much as you like here. A paragraph about how you got started, what
you care about, what you're looking for (an internship, collaborators, a job).
`
  },

  /* ---------- UNIVERSITY ----------
     One block per course or project. Newest first.
     "details" is long text and opens when someone clicks "Read more". */
  university: [
    {
      title: "Course or project name",
      meta: "Autumn 2026 · Course code",
      summary: "One or two sentences about what this was.",
      image: "images/placeholder-1.svg",
      imageAlt: "Screenshot of the project",
      tags: ["Python", "Data analysis"],
      details: `
## What I did

Explain the problem, your approach and what you learned.

## Result

Grade, outcome, or what you'd do differently next time.
`,
      links: [{ label: "Report (PDF)", url: "files/report.pdf" }]
    },
    {
      title: "Another course project",
      meta: "Spring 2026",
      summary: "A short description.",
      image: "",
      tags: ["Team project"],
      details: "",
      links: []
    }
  ],

  /* ---------- PERSONAL PROJECTS ----------
     featured: true  → also shown on the home page. */
  projects: [
    {
      title: "Project one",
      meta: "2026",
      summary: "What it is and why you built it.",
      image: "images/placeholder-2.svg",
      imageAlt: "Screenshot of project one",
      tags: ["JavaScript", "Web"],
      featured: true,
      details: `
## The idea

Longer explanation goes here. Include what was hard and what you're proud of.
`,
      links: [
        { label: "Live demo", url: "https://example.com" },
        { label: "Source code", url: "https://github.com/your-username/project-one" }
      ]
    },
    {
      title: "Project two",
      meta: "2025",
      summary: "Another thing you made.",
      image: "images/placeholder-3.svg",
      imageAlt: "",
      tags: ["Hardware"],
      featured: true,
      details: "",
      links: []
    }
  ],

  /* ---------- INTERESTS ---------- */
  interests: [
    {
      title: "Photography",
      text: "A sentence or a few about it. Add an image if you want one.",
      image: "images/placeholder-4.svg",
      imageAlt: ""
    },
    {
      title: "Cycling",
      text: "Another interest.",
      image: ""
    },
    {
      title: "Board games",
      text: "And another.",
      image: ""
    }
  ],

  /* ---------- NOTES (a simple blog) ----------
     To publish a new post, copy one block and paste it at the TOP.
     "id" must be unique, with no spaces (it becomes part of the link). */
  posts: [
    {
      id: "hello-world",
      title: "Hello, world",
      date: "2026-11-23",
      summary: "First post: why I made this site.",
      body: `
This is the first note on my new site.

You can write **long posts** here, add [links](https://example.com),
and include images:

![Describe the image](images/placeholder-1.svg)

## A heading

- bullet one
- bullet two
`
    }
  ]
};
