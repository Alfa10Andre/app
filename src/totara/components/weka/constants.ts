/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 */
enum WekaEditorType {
  attachment = "attachments",
  text = "text",
  paragraph = "paragraph",
  doc = "doc",
  video = "video",
  linkBlock = "link_block",
  linkMedia = "link_media",
  image = "image",
  bulletList = "bullet_list",
  listItem = "list_item",
  orderedList = "ordered_list",
  emoji = "emoji",
  hashtag = "hashtag",
  mention = "mention",
  ruler = "ruler",
  heading = "heading",
  audio = "audio"
}

const MAX_LIST_ITEM_LEVELS = 5;

export { WekaEditorType, MAX_LIST_ITEM_LEVELS };
