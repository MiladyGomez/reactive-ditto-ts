import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from '@utils/axiosInstance';
import RouterProps from '@interface/routerProps';
import { RecoilRoot } from 'recoil';

// Layout
import Layout from '@ui/Layout/Layout';

// Containers
import Index from '@containers/Index/Index';
import Page from '@containers/Page/Page';
import Error404 from '@containers/Error404/Error404'

import '@styles/app.scss';

const App: React.FC = () => {

  const [ routerMap, setRouterMap ] = useState<RouterProps>({
    basename: '/',
    items: []
  });

  useEffect(() => {
    let isCancelled = false;
    const getRoutes = async () => axios.get('router/pages')
      .then(response => { if (response.data) setRouterMap(response.data) })
      .catch(err => { console.log(err) })

    if (!isCancelled) getRoutes();

    return () => { isCancelled = true; }
  }, [])
    
  return(
    <>
      { routerMap.items.length > 0 ?
        <BrowserRouter basename={routerMap.basename ?? ''}>
          <RecoilRoot>
            <Layout>
              <Routes>
                {routerMap.items.map(item => {
                  return item.post_type == "page" ? 
                      <Route key={item.ID} path={item.post_name} element={
                        <Page id={item.ID} postTitle={item.post_title} />
                      }/>
                    :
                      <Route key={item.ID} path={item.post_name} element={
                        <Index postTitle={item.post_title} />
                      }/>
                })}
                <Route path="*" element={<Error404 />} />
              </Routes>
            </Layout>
          </RecoilRoot>
        </BrowserRouter>
      : null}
    </>
  )
}

const appElement = document.getElementById("app");
if (!appElement) throw new Error("Failed to find element with id 'app'");

const root = ReactDOM.createRoot(appElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('What are you doing? \nLooking for secrets?');