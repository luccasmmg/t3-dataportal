import type { AstroComponentFactory } from 'astro/dist/runtime/server';

export interface Post {
  id: string;
  slug: string;

  publishDate: Date;
  title: string;
  description?: string;

  image?: string;

  canonical?: string | URL;
  permalink?: string;

  draft?: boolean;

  excerpt?: string;
  category?: string;
  tags?: Array<string>;
  author?: string;

  Content: AstroComponentFactory;
  content?: string;

  readingTime?: number;
}

export interface MetaSEO {
  title?: string;
  description?: string;
  image?: string;

  canonical?: string | URL;
  noindex?: boolean;
  nofollow?: boolean;

  ogTitle?: string;
  ogType?: string;
}

export interface Dataset {
  id: string;
  name: string;
  title: string;
  description: string;
  url: string;
  authorEmail: string;
  licenseId: string;
  licenseTitle: string;
  licenseUrl: string;
  private: true;
  portalId: string;
  orgId: string;
  resources: Resource[];
  Organization: Organization;
  groups: Group[];
}

export interface Resource {
  id: string;
  name: string;
  url: string;
  format: string;
  private: true;
  datasetId: string;
}

export interface Organization {
  name: string;
  title: string;
  image: string;
  description: string;
  private: boolean;
  id: string;
}

export interface Group {
  name: string;
  title: string;
  image: string;
  description: string;
  id: string;
}

export interface Portal {
  name: string;
  title: string;
  private: boolean;
  description: string;
  sysAdminId: string;
}

export interface SearchInputs {
  queryString: string;
  portalName: string;
}
