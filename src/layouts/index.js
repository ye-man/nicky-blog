import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './index.css';

require('typeface-roboto');
require('typeface-roboto-slab');

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Helmet
        title="Nicky blogs"
        meta={[
          { name: 'description', content: 'Nicky talks about (web)development' },
          { name: 'keywords', content: 'blog, programming, javascript' },
        ]}
      >
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/icons/icon-256x256.png" />
      </Helmet>
      <Header />
      <main>{children()}</main>
      <Footer />
    </React.Fragment>
  </ThemeProvider>
);

export default TemplateWrapper;
