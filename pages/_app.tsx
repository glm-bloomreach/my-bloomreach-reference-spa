/*
 * Copyright 2019-2021 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import React, { ErrorInfo } from 'react';
import { CookiesProvider } from 'react-cookie';

import './app.css';

export default class MyApp extends App {
  static AppTree: AppTreeType;

  static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    // console.log('[MyApp.getInitialProps]: appProps=', appProps);
    const { ctx, AppTree: tree } = appContext;
    MyApp.AppTree = tree;
    return { ...appProps };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('[Error]: ', error);
  }

  render() {
    // console.log('[App]: AppProps=', this.props);
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Example Next.js SPA for Bloomreach Experience" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="shortcut icon" type="image/png" href="/favicon.ico" sizes="64x64" />
          <link
            rel="stylesheet"
            media="screen"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
          <script defer src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
            integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
            crossOrigin="anonymous"
          />

          <title>brXM + Next.js = ♥️</title>
        </Head>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </>
    );
  }
}
