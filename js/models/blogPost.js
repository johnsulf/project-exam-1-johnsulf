import { formattedDate } from "../helpers/timeFormatter.js"

export class BlogPost {
  constructor({ id, title, content, author, date, category, featuredImage }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
    this.category = category;
    this.featuredImage = featuredImage;
  }

  static fromJson(json) {
    return new BlogPost({
      id: json.id,
      title: json.title.rendered,
      author: json._embedded.author[0].name,
      date: formattedDate(json.date),
      category: json._embedded['wp:term'][0][0].name,
      featuredImage: json._embedded['wp:featuredmedia'][0].source_url,
      content: json.content.rendered,
    });
  }
}