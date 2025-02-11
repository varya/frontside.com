import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './posts-list.css';
import Text from '../text';

PostsList.propTypes = {
  heading: PropTypes.node,
  pagination: PropTypes.node,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default function PostsList({
  heading = null,
  posts,
  pagination = null,
}) {
  return (
    <>
      { (heading) ?
        <section className="widewrapper herowrapper w-container">
          <div className="herotext">
            {heading}
          </div>
        </section>
        : ''}
      <div className="widewrapper post-list-wrapper column w-container">
        <ul className="entries-list">
          {posts.map(post => (
            <li key={post.id} className="colorborderwrapping entrypreview">
              <div className="entry-preview">
                {post.image ? (
                  <Link to={post.slug}>
                    <img src={post.image} alt="" className="entry-preview-image" />
                  </Link>
                ) : ''}
                <h3 className="posts-list-title">
                  <Link to={post.slug}>{post.title}</Link>
                </h3>
                <Text tag="p" className="posts-list-meta">
                {(!post.fromPodcast) ? (
                    <>
                      <span className="posts-list-authors">
                        {post.authors.map((author, i) => (
                          <>
                            {i === 0 ? '' : ((post.authors.length) > 2 ? ', ' : ' and ')}
                            {/* Author links will lead to team member page, which is currently pending. */}
                            {/* <Link key={author.slug} to={author.slug}>
                                  <Text>{author.name}</Text>
                                </Link>
                            */}
                            <Text key={author.slug} >{author.name}</Text>
                          </>
                        ))}
                      </span>

                      <span className="posts-list-date">
                        {post.date}
                      </span>
                    </>
                  ): (
                    <>
                      Podcast, hosted by {post.authors.map((author, i) => (
                          <>
                            <Text key={author.slug} >{author.name}</Text>
                          </>
                        ))}
                    </>
                  )}
                  
                </Text>
                <Text tag="p">{post.description}</Text>
                <Link to={post.slug} className="post-link">
                  {(!post.fromPodcast) ? (
                    <>
                      Read article <span className="post-link--arrow">→</span>
                    </>
                  ): (
                    <>
                      Listen to episode <span className="post-link--arrow">→</span>
                    </>
                  )}
                  
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {pagination}
      </div>
    </>
  );
}
