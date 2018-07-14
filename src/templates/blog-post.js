import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { TABLET_WIDTH, LARGE_DISPLAY_WIDTH } from 'typography-breakpoint-constants';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import { rhythm } from '../utils/typography';

const ArticleContainer = styled.div`
  display: block;
  & > article {
    box-shadow: 0px 3px 25px #333;
    background-color: #fff;
    grid-column: 2/3;
    grid-row: 2/3;
    border-radius: 5px;
    padding: ${rhythm(1)};
    h1:first-child {
      margin-top: 0;
    }
  }
  @media (min-width: ${TABLET_WIDTH}) {
    display: grid;
    grid-template-columns: ${rhythm(2)} 1fr ${rhythm(2)};
    grid-template-rows: ${rhythm(1)} 1fr ${rhythm(1)};
    & > article {
      padding: ${rhythm(2)};
    }
    .gatsby-highlight {
      /* use negative margin instead of css grid to preserve margin collapsing */
      margin-left: -${rhythm(2)};
      margin-right: -${rhythm(2)};
    }
  }
  @media (min-width: ${LARGE_DISPLAY_WIDTH}) {
    grid-template-columns: ${rhythm(4)} minmax(auto, 66em) ${rhythm(4)};
    justify-content: center;
    & > article {
      padding: ${rhythm(3)};
    }
  }
`;

const Section = styled.section`
  @media (min-width: ${TABLET_WIDTH}) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${rhythm(10)} ${rhythm(3)} 1fr;
    & > div:first-child {
      grid-row: 1/3;
      grid-column: 1/2;
      z-index: 20;
    }
    & > div:last-child {
      grid-row: 2/4;
      grid-column: 1/2;
      z-index: 30;
    }
  }
`;

// TODO: accomplish overlap without divitis, maybe use styled(ReactComponent)

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta
          name="twitter:image"
          content={data.site.siteMetadata.siteUrl + post.frontmatter.cover.childImageSharp.sizes.src}
        />
      </Helmet>
      <Section>
        <div>
          <Hero
            title={post.frontmatter.title}
            coverSizes={post.frontmatter.cover ? post.frontmatter.cover.childImageSharp.sizes : null}
          />
        </div>
        <div>
          <ArticleContainer>
            <article>
              <h1>{post.frontmatter.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
          </ArticleContainer>
        </div>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover {
          childImageSharp {
            sizes(maxWidth: 1920) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;

export default BlogPostTemplate;
