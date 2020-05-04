import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProfileProvider } from "./Profile";
import { HomePage, path as homePagePath } from "../pages/HomePage";
import { NewPostPage, path as newPostPagePath } from "../pages/NewPostPage";

const App = () => {
  return (
    <ProfileProvider>
      <Routes>
        <Route path={homePagePath} element={<HomePage />} />
        <Route path={newPostPagePath} element={<NewPostPage />} />
      </Routes>
    </ProfileProvider>
  );
};

export default App;
