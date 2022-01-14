import stringsJson from "../locale/strings_en.json";

export const useLocale = () => {
  const strings: { [key: string]: string } = stringsJson;
  const t = (key: string) => strings[key] || key;
  return { t };
};
