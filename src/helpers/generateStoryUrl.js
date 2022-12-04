import md5 from "md5";
const generateStoryUrl = story => {
  return "#/" + story.source + '/' + md5(story.link)
}
export default generateStoryUrl;