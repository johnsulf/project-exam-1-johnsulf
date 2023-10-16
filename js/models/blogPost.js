import { formattedDate } from "../helpers/timeFormatter.js"

export class BlogPost {
  constructor({
    id,
    title,
    content,
    author,
    date,
    category,
    featuredImage,
    featuredImageAlt,
    featuredImageCaption,
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
    this.category = category;
    this.featuredImage = featuredImage;
    this.featuredImageAlt = featuredImageAlt;
    this.featuredImageCaption = featuredImageCaption;
  }

  static fromJson(json) {
    return new BlogPost({
      id: json.id,
      title: json.title.rendered,
      author: json._embedded.author[0].name,
      date: formattedDate(json.date),
      category: json._embedded['wp:term'][0][0].name,
      featuredImage: json._embedded['wp:featuredmedia'][0].source_url,
      featuredImageAlt: json._embedded['wp:featuredmedia'][0].alt_text,
      featuredImageCaption: json._embedded['wp:featuredmedia'][0].caption.rendered,
      content: json.content.rendered,
    });
  }
}