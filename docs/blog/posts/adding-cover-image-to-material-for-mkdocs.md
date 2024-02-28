---
title: Easy way to add Cover Image in Material for MkDocs Blogs
description: This blog post outlines an efficient method for incorporating cover images into Material for MkDocs blogs, leveraging the Attribute Lists markdown extension. The author shares a detailed walkthrough for customizing cover images with captions, including alignment and sizing on both individual posts and the index page. The post serves as a practical guide for MkDocs users looking to enhance their blog's visual appeal without compromising on layout or readability.
date: 2024-02-28
tags:
  - MkDocs
  - TechTips
draft: false
comments: true
---

![Image showing a monitor with a blog open](assets/images/blog-cover-mkdocs-demo.png)
*Image created by OpenAI's DALL·E*
{.cover-image}

Incorporating a figure with a caption in markdown can be cumbersome, especially if you're aiming for specific styling. Directly adding an image with a caption through raw HTML requires extensive boilerplate for each image, which isn't ideal for every cover image in your content.

Here's how I used [Attribute Lists](https://python-markdown.github.io/extensions/attr_list/) (1) markdown extension to streamline the process.
{ .annotate }

1. Attribute Lists extension allows you to add HTML attributes and CSS classes to markdown elements. You can enable it in your `mkdocs.yml` file by adding the following configuration:
```yml
markdown_extensions:
  - attr_list
```

<!-- more -->


The goal was to integrate a cover image into MkDocs blog posts with the following criteria:

- Customizable styling options
- Caption alignment at the center of the image
- Placement of the cover image above tags and titles
- A smaller/concise preview of the cover image on the index page to avoid overcrowding

A straightforward approach involves inserting the image using markdown syntax and adding a caption below it, as discussed [in this thread](https://github.com/squidfunk/mkdocs-material/issues/4364#issuecomment-1247196335). However, this method doesn't utilize meta-data for rendering the title, so you have to manually type it again. It also results in the image being displayed at full size on the index page, which might not be desirable in the post excerpts. For comprehensive reference on images, refer to the Material for MkDocs official documentation [here](https://squidfunk.github.io/mkdocs-material/reference/images/). However, this guide did not solve my specific requirements.

Here's a succinct method to achieve the desired outcome using a clever workaround:

!!! info "Prerequisites"
    To enable customization, first ensure `extra.css` is included in your `mkdocs.yml`, following [these instructions](https://squidfunk.github.io/mkdocs-material/customization/).

=== ":octicons-file-code-16: `your-blog-post.md`"

    ```markdown
      ![Image Description](/path/to/your/image.png)
      *Your image caption*
      {.cover-image}
    ```
    !!! tip "Tip for the blog post"
        Make sure to have at least one line gap after the `{.cover-image}` tag. And one line above the image link if it is not the first element. This ensures the image and the `<em>` is rendered as a single block as below.
        ```html
        <p class="cover-image">
          <img src="/path/to/your/image.png" alt="Image Description">
          <em>Your image caption</em>
        </p>
        ```

=== ":octicons-file-code-16: `/docs/stylesheets/extra.css`"

    ```css
      .md-content__inner {
      display: grid; /*(1)!This hack enables ordering of elements*/
      }

      .cover-image {
        order: -1; /*(2)!This hack moves the cover image above the title*/
        display: grid;
        width: 75%;
        margin: 0 auto;

        em {
          font-size: 0.8em;
          text-align: center;
          color: gray;
        }
      }

      .md-post--excerpt .cover-image { /*(3)!This setting is for index page*/
        width: 20%;
        float: left;
        margin: 0 1em 1em 0;

        em {
          display: none;
        }
      }

      .md-post--excerpt::after { /*(4)! */
        content: "";
        display: table;
        clear: both;
      }

    ```

    1. :material-arrow-up-down-bold: This hack enables ordering of elements
    2. :material-arrow-up-bold: This hack moves the cover image above the title
    3. :material-format-float-left: This setting is for making the image smaller in the index page
    4. :material-format-clear: Please note that floating elements can sometimes cause layout issues, so it's a good idea to clear the float after the floating elements. You can do this by applying the `clearfix` hack to the parent element like it's done here. This will ensure that the `.md-post--excerpt` element's height takes into account the floated `.cover-image` element.

=== ":octicons-file-code-16: `mkdocs.yml`"

    ```yaml
      extra_css:
        - stylesheets/extra.css # (1)! This is for custom styling
      markdown_extensions:
        - attr_list # (2)! This is for adding classes to markdown elements
    ```

    1. This is to enable custom style by extending the theme
    2. This adds the ability to add classes to markdown elements 
      ```markdown
      ## Title {.class-name}
      ```

!!! question "How do you add cover image in your MkDocs blog?"
    Do you have a easier way to add cover images in your MkDocs blog? Would love to hear your thoughts and experiences.
