const r2PublicDomain = "https://pub-f2a1168bcc8267043d925c14d7a08960.r2.dev";
const workerDomain = "https://r2-proxy-worker.andriyivvanyuk.workers.dev";

export const replaceDomain = (imagePath) => {
  if (!imagePath) return imagePath;
  return imagePath?.replace(r2PublicDomain, workerDomain);
};

export const replaceDomainsInProducts = (products) => {
  return products.map((product) => ({
    ...product,
    images: product.images
      ? product.images.map((img) => replaceDomain(img))
      : [],
  }));
};
