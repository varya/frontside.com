import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/posts-list';
import Pagination from '../components/pagination';

import BlogHeroImage from '../img/plork/blog-hero@1.5x.png';

import './blog-list.css';

const PodcastFeaturedEpisodes = [
  {
    fromPodcast: true,
    id: 'intro-to-rush-js',
    slug: '/podcast/intro-to-rush-js-with-pete-gonzalez',
    image: '/img/2020-pod-rush.png',
    title: 'Intro to Rush.js with co-author Pete Gonzales',
    description: 'Monorepos are the new muse of library maintainers, but what happens when your project grows past 100 packages in the same repo? What about thousands? Rush.js was created for those cases, and Pete—who started the project while working at Microsoft—is here to tell us about it.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell'
      }
    ]
  },
  {
    fromPodcast: true,
    id: 'repkgs-reasonml',
    slug: '/podcast/repkgs-reasonml',
    image: '/img/2020-reason-podcast.png',
    title: 'Type systems with ReasonML London organizer Marcel Cutts and Shane Wilson',
    description: '"Java has done an excellent job at ruining types for everyone for quite a while—explains Marcel after describing the tech pub scene in London—but it\'s important to know there\'s more than one kind of type system." Along with Shane, they outline what\'s exciting about ReasonML and their experience with new languages and tools around types.',
    authors: [
      {
        key: 'charles-lowell',
        name: 'Charles Lowell'
      }
    ]
  }
]

export default function BlogPage({
  data: {
    allMarkdownRemark: { edges: posts },
  },
  pageContext: { page, pages },
}) {

  let formattedPosts = posts.map(({ node }) => ({
    id: node.id,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    description: node.frontmatter.description,
    excerpt: node.excerpt,
    image:
      (node.frontmatter.img == null)
        ? null
        : node.frontmatter.img.childImageSharp.resolutions.src
    ,
    authors: node.fields.authors.map(author => ({
      slug: author.fields.slug,
      name: author.frontmatter.name,
    })),
  }));

  if (page === 1) {
    let postsAndEpisodes = [
      ...formattedPosts.slice(0,2),
      PodcastFeaturedEpisodes[0],
      ...formattedPosts.slice(2,5),
      PodcastFeaturedEpisodes[1],
      ...formattedPosts.slice(3),
    ];
    formattedPosts = postsAndEpisodes;
  }

  return (
    <Layout title={page === 1 ? 'Blog' : `Blog - page ${page}`}>
      <section className="widewrapper herowrapper w-container">
        <div className="herotext">
          <h1 className="heading">Sharing <span className="gradient-text">Frontside's</span> latest discoveries</h1>
          <p className="subheader">
            Find useful ideas and practical tips on apps engineering through our articles and podcast.
          </p>
          {page > 1 ? (
            <div class="hero-navigation">
              <h2 class="hero-navigation-title">
                Page <em class="hero-navigation-page">{page}</em>
              </h2>
              <Pagination prefix="/blog" page={page} pages={pages} />
            </div>
          ) : ''}
        </div>
        <div className="consultingheroimage">
          <img src={BlogHeroImage} alt="" />
        </div>
      </section>
      <PostsList
        pagination={<Pagination prefix="/blog" page={page} pages={pages} />}
        posts={formattedPosts}
      />
    </Layout>
  );
}

BlogPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
            authors {
              fields {
                slug
              }
              frontmatter {
                name
              }
            }
          }
          frontmatter {
            title
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
            img {
              childImageSharp {
                resolutions(width: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
