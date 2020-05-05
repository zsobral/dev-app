import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProfileProvider } from "./Profile";
import { HomePage, path as homePagePath } from "../pages/HomePage";
import { NewPostPage, path as newPostPagePath } from "../pages/NewPostPage";
import {
  CreateProfilePage,
  path as createProfilePage,
} from "../pages/CreateProfilePage";

const App = () => {
  return (
    <ProfileProvider>
      <Routes>
        <Route path={homePagePath} element={<HomePage />} />
        <Route path={newPostPagePath} element={<NewPostPage />} />
        <Route path={createProfilePage} element={<CreateProfilePage />} />
      </Routes>
    </ProfileProvider>
  );
};

export default App;
