import { fetchSiteMetaData } from "./siteMetaData.services";
import { fetchPageBySlug } from "./page.services";
import { fetchArticleBySlug } from "./article.services";

export const payloadServices = {
  fetchSiteMetaData,
  fetchPageBySlug,
  fetchArticleBySlug,
};
