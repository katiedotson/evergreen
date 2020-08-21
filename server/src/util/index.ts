export default {
  createUrlNameFromTitle(title: string): string {
    title = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    return title;
  },
};
