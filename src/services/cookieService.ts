export const saveStoreIdToCookie = (storeId: string) => {
  document.cookie = `storeId=${storeId}; path=/; max-age=2592000`; // 30 днів
};
