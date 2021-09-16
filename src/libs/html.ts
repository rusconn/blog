import cheerio from "cheerio";
import hljs from "highlight.js";

const highlightCodes = (html: string) => {
  const $ = cheerio.load(html);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  return $.html();
};

export default highlightCodes;
