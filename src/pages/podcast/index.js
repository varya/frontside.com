import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
// import Img from "gatsby-image"

import Layout from "../../components/layout";
import EpisodesList from "../../components/episodes-list";
import Text from "../../components/text";

const PodcastPage = ({
  data: {
    site: {
      siteMetadata: { title }
    },
    allSimplecastEpisode: { edges }
  }
}) => {
  return (
    <Layout>
      <Helmet title={`Podcast | ${title}`} />
      <EpisodesList
        heading={
          <Text tag="h2" align="center">
            The Frontside Podcast
          </Text>
        }
        episodes={edges.map(({ node }) => ({
          title: node.title,
          slug: node.slug,
          id: node.id,
          description: node.description,
          date: new Date(node.publishedAt).toLocaleDateString("en-US"),
          authors: node.authors.map(author => ({
            slug: author.fields.slug,
            name: author.frontmatter.name
          }))
        }))}
      />
    </Layout>
  );
};

PodcastPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PodcastPage;

export const episodesQuery = graphql`
  query EpisodesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allSimplecastEpisode {
      edges {
        node {
          id
          number
          season
          title
          description
          longDescriptionHtml
          slug
          publishedAt
          authors {
            frontmatter {
              name
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
